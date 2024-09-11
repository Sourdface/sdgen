import { Command, Option } from 'commander'

import genCommand from './commands/gen-command.js'

const program = new Command()

program
  .name('sdgen')
  .description(
    'Perform actions using a Stable Diffusion image generation server.')
  .version('0.0.0')
  .addOption(
    new Option(
      '-u, --api-url <url>',
      'API endpoint URL. Currently supports only Automatic1111 Web UI.',
    )
    .env('SD_API_URL')
    .default('http://localhost:7860')
  )
  .addCommand(genCommand)

await program.parseAsync(process.argv)
