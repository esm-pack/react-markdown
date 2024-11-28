import path from 'path'
import esbuild from 'esbuild'

export const buildEsm = async (inputPath, outputPath) => {
  const input = path.resolve(import.meta.dirname, '../', inputPath)
  const output = path.resolve(import.meta.dirname, outputPath)

  await esbuild.build({
    entryPoints: [input],
    outfile: output,
    bundle: true,
    minify: true,
    sourcemap: false,
    format: 'esm',
    target: 'esnext',
    external: ['react'],
  })
}

buildEsm('lib/index.js', 'index.mjs')