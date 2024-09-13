import fs from 'node:fs/promises'
/** @import { Command } from 'commander' */
import Axios from 'axios'
import { createHash } from 'node:crypto'

/**
 * @param {object} opts
 * @param {number} opts.cfgScale
 * @param {number} opts.height
 * @param {number} opts.negativePrompt
 * @param {string} opts.output
 * @param {string} opts.prompt
 * @param {string} opts.samplerName
 * @param {string} opts.scheduler
 * @param {string} opts.sdModelCheckpoint
 * @param {number} opts.seed
 * @param {number} opts.steps
 * @param {string} opts.styles
 * @param {number} opts.width
 * @param {import('commander').Command} command
 */
export default async function genAction(opts, command) {
  const apiUrl = /** @type {Command} */ (command.parent).opts().apiUrl
  const url = `${apiUrl}/sdapi/v1/txt2img`
  console.log('Stable Diffusion URL: ' + url)
  /** @type Record<string, any> */
  const params = {
    cfg_scale: opts.cfgScale,
    height: opts.height,
    negative_prompt: opts.negativePrompt,
    prompt: opts.prompt,
    sampler_name: opts.samplerName,
    scheduler: opts.scheduler,
    seed: opts.seed,
    steps: opts.steps,
    styles: opts.styles ? opts.styles.split(',').map((s) => s.trim()) : [],
    width: opts.width
  }
  if (opts.sdModelCheckpoint) {
    params.override_settings = {
      sd_model_checkpoint: opts.sdModelCheckpoint
    }
    params.override_settings_restore_afterwards = false
  }
  console.log('Request params: ', params)
  console.log('Generating...')
  const result = await Axios.post(url, params)
  console.log('Generation complete.')
  const img = Buffer.from(result.data.images[0], 'base64')
  const hash = createHash('sha256')
  hash.update(img)
  const hashHex = hash.digest('hex')
  console.log(`Image has hash "${hashHex}"`)
  const filename = opts.output.replaceAll('[HASH]', hashHex)
  // TODO: Maybe we don't need this restriction
  if (!filename.endsWith('.png')) {
    throw new Error(`File name "${filename}" does not end with ".png"`)
  }
  console.log(`Writing image to "${filename}" ...`)
  await fs.writeFile(filename, img)
  console.log('Done.')
}
