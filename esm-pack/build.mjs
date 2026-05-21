import path from 'path'
import esbuild from 'esbuild'
import fs from 'fs'

const license = fs.readFileSync('./license', 'utf-8');

export const buildEsm = async (inputPath, outputPath) => {
  const input = path.resolve(import.meta.dirname, '../', inputPath)
  const output = path.resolve(import.meta.dirname, outputPath)

  await esbuild.build({
    entryPoints: [input],
    outfile: output,
    bundle: true,
    minify: true,
    legalComments: 'none',
    sourcemap: false,
    format: 'esm',
    target: 'esnext',
    external: ['react'],
    banner: {
      js: `/**\n${license.trim()}\n*/`,
    },
    footer: {
      js: `/* build by esm pack */`
    }
  })
}

buildEsm('index.js', 'index.mjs')