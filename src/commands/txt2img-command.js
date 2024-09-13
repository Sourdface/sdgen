import { Command, Option } from "commander"

import genAction from '../actions/gen-action.js'
import { tryParseInt, tryParseFloat } from "../util.js"

const txt2img = new Command()
  .command('txt2img')
  .description('Generate an image from a text prompt.')
  .addOption(
    new Option(
      '-g, --cfg-scale <cfgScale>',
      'Classifier-free guidance scale value as a float.'
    )
    .env('SD_CFG_SCALE')
    .default(7.5)
    .argParser(tryParseFloat('Invalid CFG scale value: {value}'))
  )
  // TODO: Add this back in when it actually does something
  // .addOption(
  //   new Option(
  //     '-c, --checkpoint <checkpoint>',
  //     'Stable Diffusion checkpoint name. If none is passed, the last ' +
  //     'checkpoint to be loaded will be used.'
  //   )
  //   .env('SD_CHECKPOINT')
  // )
  .addOption(
    new Option(
      '-H, --height <height>',
      'Height of the image.'
    )
    .env('SD_HEIGHT')
    .default(1024)
    .argParser(tryParseInt('Invalid height: {value}'))
  )
  .addOption(
    new Option(
      '-n, --negative-prompt <negativePrompt>',
      'The negative prompt for the image.'
    )
    .env('SD_NEGATIVE_PROMPT')
  )
  .addOption(
    new Option(
      '-o, --output <output>',
      'The name of the file where the resulting image will be stored. This ' +
      'MUST end with \'.png\'. The substring \'[HASH]\' will be replaced ' +
      'with a hash value for the image.'
    )
    .env('SD_OUTPUT')
    .default('[HASH].png')
  )
  .addOption(
    new Option(
      '-p, --prompt <prompt>',
      'The positive prompt for the image.',
    )
    .env('SD_PROMPT')
  )
  .addOption(
    new Option(
      '-m, --sampler-name <sampler_name>',
      'Name of the sampler to use.'
    )
    .env('SD_SAMPLER_NAME')
    .default('Euler')
  )
  .addOption(
    new Option(
      '-e, --scheduler <scheduler>',
      'Name of the scheduler to use.'
    )
    .env('SD_SCHEDULER')
    .default('Simple')
  )
  .addOption(
    new Option(
      '-s, --seed <seed>',
      'The seed value for the image. If undefined, -1, or an empty string is ' +
      'given, then a random value will be used.'
    )
    .env('SD_SEED')
    .default(-1)
    .argParser(
      (val) => tryParseInt('Invalid seed: {value}')(
        (val === '' || val == null) ? '-1' : val
      )
    )
  )
  .addOption(
    new Option(
      '-t, --steps <steps>',
      'Number of generation steps.',
    )
    .env('SD_STEPS')
    .default(20)
    .argParser(tryParseInt('Invalid number of steps: {value}'))
  )
  .addOption(
    new Option(
      '-y, --styles <styles>',
      'Comma-seperated list of one or more styles to apply to the prompt'
    )
    .env('SD_STYLES')
  )
  .addOption(
    new Option(
      '-W, --width <width>',
      'Width of the image.',
    )
    .env('SD_WIDTH')
    .default(1024)
    .argParser(tryParseInt('Invalid width: {value}'))
  )
  .action(genAction)

export default txt2img
