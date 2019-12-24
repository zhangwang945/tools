# 抽奖

### 参数
1、 ele  插入到页面位置的dom
2、 Array 数据
3、 options 可选参数  

```
options.pop 弹窗
```
    
### example

```
    //clientDraw.create 参数 (ele,Array) 
    // 第二个参数为数组，rate为中奖几率，保留两位小数；
    //所有的中奖几率总和为 100 , 其中没有rate属性的 将会取 (100-已设置几率总和)/未设置几率的个数  该值作为中奖几率
    //clientDraw.getResult  
    clientDraw.create(document.body, [
        [{ title: 1, rate: 50 }, { title: 2, rate: 30 }, { title: 3 }],
        [{ title: 4 }, { title: 6 }],
        [{ title: 7 }, { title: 8 }, { title: 9 }]
    ])
```