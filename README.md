# SD Gen

A simple command line utility for generating images using Stable Diffusion.

Written in [Node.js](https://nodejs.org) using [Commander](https://www.npmjs.com/package/commander) and [Axios](https://www.npmjs.com/package/axios).

TypeScript is used only for IDE completion and is not needed to compile or run.

## Install

Node.js must be available on your PATH.

Clone this repo, run `npm i` from inside, then link `bin/sdgen` to a location in your PATH.

Example:

```bash
git clone https://github.com/sourdface/sdgen.git
cd sdgen
npm i
sudo ln -s bin/sdgen /usr/local/bin/sdgen
cd -
```

## Usage

You must have access to a running instance of [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) (or compatible API server). You can either run this locally or use an online service; specify the url using `--api-url`, `-u`, or the variable `SD_API_URL`.

Note that you cannot currently set the checkpoint from the command line. (This is planned.) The checkpoint will be the last one loaded by Stable Diffusion WebUI.

### Base Command

```txt
Usage: sdgen [options] [command]

Perform actions using a Stable Diffusion image generation server.

Note that most if not all command line options have environment variable equivalents.

Options:
    -V, --version        output the version number

    -u, --api-url <url>  API endpoint URL. Currently supports only
                         Automatic1111 Web UI.
                         (default: "http://localhost:7860", env: SD_API_URL)

    -h, --help           display help for command

Commands:
    txt2img [options]    Generate an image from a text prompt.

    help [command]       display help for command
```

### txt2img

```txt
Usage: sdgen txt2img [options]

  Generate an image from a text prompt.

Options:
    -g, --cfg-scale <cfgScale>     Classifier-free guidance scale value as a
                                   float.
                                   (default: 7.5, env: SD_CFG_SCALE)

    -H, --height <height>          Height of the image.
                                   (default: 1024, env: SD_HEIGHT)

    -n, --negative-prompt <negativePrompt>
                                   The negative prompt for the image.
                                   (default: "", env: SD_NEGATIVE_PROMPT)

    -o, --output <output>          The name of the file where the resulting
                                   image will be stored. This MUST end with
                                   '.png'. The substring '[HASH]' will be
                                   replaced with a hash value for the image.
                                   (default: "[HASH].png", env: SD_OUTPUT)

    -p, --prompt <prompt>          The positive prompt for the image.
                                   (default: "", env: SD_PROMPT)

    -m, --sampler-name <samplerName>
                                   Name of the sampler to use.
                                   (default: "Euler", env: SD_SAMPLER_NAME)

    -e, --scheduler <scheduler>    Name of the scheduler to use.
                                   (default: "Simple", env: SD_SCHEDULER)

    -s, --seed <seed>              The seed value for the image. If undefined,
                                   -1, or an empty string is given, then a
                                   random value will be used.
                                   (default: -1, env: SD_SEED)

    -c, --sd-model-checkpoint <sdModelCheckpoint>
                                   Stable Diffusion checkpoint name. If none is
                                   passed, the last checkpoint to be loaded
                                   will be used.
                                   (default: "", env: SD_SD_MODEL_CHECKPOINT)

    -t, --steps <steps>            Number of generation steps.
                                   (default: 20, env: SD_STEPS)

    -y, --styles <styles>          Comma-separated list of one or more styles
                                   to apply to the prompt
                                   (default: "", env: SD_STYLES)

    -W, --width <width>            Width of the image.
                                   (default: 1024, env: SD_WIDTH)

    -h, --help                     display help for command
```

## Notes

### - Forge Checkpoint Issue

While sdgen generally seems to work with [Stable Diffusion Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge/), Forge's method of setting checkpoint during generatiob appears to be [broken right now](https://github.com/lllyasviel/stable-diffusion-webui-forge/issues/1610), so when using Forge the `-c`, `--sd-model-checkpoint` option will have no effect and you will have to set it a different way.
