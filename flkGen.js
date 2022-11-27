class FlakeGenerator {
  offset
  datacenter
  worker
  counter
  constructor (options) {
    this.offset = options.offset || 0
    this.datacenter = options.datacenter || 0
    this.worker = options.worker || 0
    this.counter = 0
  }

  generate () {
    if (this.counter > 4095) this.counter = 0
    const date = (Date.now() - this.offset).toString(2).padStart(42, '0')
    const datacenter = this.datacenter.toString(2).padStart(5, '0')
    const worker = this.worker.toString(2).padStart(5, '0')
    const counter = (this.counter++).toString(2).padStart(12, '0')

    return BigInt('0b' + date + datacenter + worker + counter).toString()
  }
}

export const gen = () => {
  const year = (new Date()).getFullYear()
  const month = (new Date()).getMonth()
  const flk = new FlakeGenerator({ offset: new Date(year, month).getTime() })
  return flk.generate()
}
