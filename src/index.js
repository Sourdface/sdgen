import { Command, Option } from 'commander'

import txt2imgCommand from './commands/txt2img.command.js'

const program = new Command()

program
  .name('sdgen')
  .description(
    'Perform actions using a Stable Diffusion image generation server.\n\n' +
    'Note that most if not all command line options have environment ' +
    'variable equivalents.'
  )
  .version('0.0.0')
  .addOption(
    new Option(
      '-u, --api-url <url>',
      'API endpoint URL. Currently supports only Automatic1111 Web UI.',
    )
    .env('SD_API_URL')
    .default('http://localhost:7860')
  )
  .addCommand(txt2imgCommand)

await program.parseAsync(process.argv)
