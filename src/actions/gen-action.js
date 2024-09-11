import fs from 'node:fs/promises'
/** @import { Command } from 'commander' */
import Axios from 'axios'
import { createHash } from 'node:crypto'

/**
 * @param {object} opts
 * @param {number} opts.cfg
 * @param {string} opts.checkpoint
 * @param {number} opts.height
 * @param {number} opts.nPrompt
 * @param {string} opts.output
 * @param {string} opts.prompt
 * @param {string} opts.sampler
 * @param {string} opts.scheduler
 * @param {number} opts.seed
 * @param {number} opts.steps
 * @param {string[]} opts.style
 * @param {number} opts.width
 * @param {import('commander').Command} command
 */
export default async function genAction(opts, command) {
  const apiUrl = /** @type {Command} */ (command.parent).opts().apiUrl
  const url = `${apiUrl}/sdapi/v1/txt2img`
  console.log('Stable Diffusion URL: ' + url)
  console.log('Generation options: ', opts)
  console.log('Generating...')
  const result = await Axios.post(url, {
    cfg_scale: opts.cfg,
    height: opts.height,
    negative_prompt: opts.nPrompt,
    prompt: opts.prompt,
    sampler_name: opts.sampler,
    scheduler: opts.scheduler,
    seed: opts.seed,
    steps: opts.steps,
    styles: opts.style,
    width: opts.width
  })
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
