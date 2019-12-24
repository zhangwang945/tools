!function () {
    const draw = {
        ready: true,
        running: false,
        activeIndex: 0,
        create(ele, dataList, options = {}) {
            const renderList = [...dataList[0], ...dataList[1], ...dataList[2]]
            const container = document.createElement('div')
            container.classList.add('container')
            const startBtn = document.createElement('div')
            startBtn.classList.add('item')
            startBtn.innerText = 'start'
            startBtn.onclick = function () {
                draw.start()
            }
            container.appendChild(startBtn)
            renderList.forEach((item, index) => {
                const dom = document.createElement('div')
                dom.classList.add('item')
                dom.innerText = item.title
                renderList[index].dom = dom
                container.appendChild(dom)
                index === 3 && container.appendChild(startBtn)
            })
            ele.appendChild(container)
            renderList[this.activeIndex].dom.classList.add('active')
            this.list = [...renderList.slice(0, 3), renderList[4], ...renderList.slice(5, 8).reverse(), renderList[3]]
            
            if (options.pop) this.pop = function () {
                options.pop(this.list[this.activeIndex])
            }
            if (!this.checkRate()) {
                alert('请检查数据是否正确')
                this.ready = false
                return
            }
            this.initRate()
            this.initRange()
            return draw
        },
        pop() {
            alert(`恭喜抽中了${this.list[this.activeIndex].title}`)
        },
        readyRun() {
            this.timeStep = 300
            this.running = true
        },
        runEnd() {
            this.running = false
            setTimeout(() => {
                this.pop()
            }, 200)
        },
        checkRate() {
            let pass = true, totalRate = 0, unsetRateList = []
            this.list.forEach(item => {
                if (item.hasOwnProperty('rate')) {
                    if (typeof item.rate !== 'number') {
                        pass = false
                    } else {
                        totalRate += item.rate
                    }
                } else {
                    unsetRateList.push(item)
                }
            })
            if (pass) {
                if ((totalRate > 100) || (!unsetRateList.length && totalRate < 100)) pass = false
            }
            if (pass) {
                this.unsetRateList = unsetRateList
                this.setedTotalRate = totalRate
            }
            return pass
        },
        initRate() {
            let unsetRateList = this.unsetRateList, totalRate = this.setedTotalRate, unsetLen = unsetRateList.length, restAverage
            if (unsetLen) {
                restAverage = (100 - totalRate) / unsetLen
                restAverage = +restAverage.toFixed(2)
                // restAverage = +restAverage.toString().match(/\d*(\.\d{1,2}|)/)[0]
                unsetRateList.forEach((item, index) => {
                    if (index === unsetLen - 1) {
                        item.rate = +(100 - totalRate).toFixed(2)
                    } else {
                        item.rate = restAverage
                    }
                    totalRate = +(totalRate + restAverage).toFixed(2)
                })
            }

        },
        initRange() {
            let startNum = 0, endNum = 0
            this.list.forEach(item => {
                endNum = +(startNum + item.rate).toFixed(2)
                item.range = [startNum, endNum]
                startNum = endNum
            })
        },
        start() {
            if (!this.ready || this.running) return
            this.readyRun()
            let i = 0, list = this.list, forward = true, loop = 8 * 13,
                drawVal = (Math.random() * 100).toString().match(/\d*(\.\d{1,2}|)/)[0],
                drawIndex = list.findIndex(item => drawVal >= item.range[0] && drawVal < item.range[1])
            console.log(drawIndex, list[drawIndex]);
            loop += drawIndex - this.activeIndex
            const interationFunc = () => {
                setTimeout(() => {
                    i++
                    let activeIndex = this.activeIndex, time
                    list[activeIndex].dom.classList.remove('active')
                    activeIndex = activeIndex < 7 ? activeIndex + 1 : 0
                    list[activeIndex].dom.classList.add('active')
                    this.activeIndex = activeIndex
                    if (forward && this.timeStep > 40) {
                        time = Math.floor(this.timeStep * 0.8)
                        if (time <= 40) {
                            this.timeStep = 40
                            forward = false
                        } else {
                            this.timeStep = time
                        }
                    }
                    if (!forward && i > loop - 20) {
                        time = Math.floor(this.timeStep * 1.2)
                        this.timeStep = time
                    }
                    if (i < loop) {
                        interationFunc()
                    } else {
                        this.runEnd()
                    }
                }, this.timeStep)
            }
            interationFunc()
            return list[drawIndex]
        }
    }
    window.clientDraw = {
        create(...arg) {
            draw.create(...arg)
        },
        getResult() {
            return draw.list[draw.activeIndex]
        }
    }
}()