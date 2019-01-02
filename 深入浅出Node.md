# 深入浅出Node
- [ ] C++编译

### 异步编程

1. 发布/订阅模式

   node 自身提供events 模块

   addListener/on() 

   once()

   removeListener()

   removeAllListener()

   emit()

2. Promise/Deferred 模式

### 内存控制

_新生代空间_ Scavenge算法内存回收算法 **具体实现算法为cheney** 

 cheney算法：

将堆内存分为2部分 一部分使用中，一部分为闲置状态

使用中的那一部分称为From 闲置状态的那一部分为 To 。开始回收的时候从From开始，先检查存活的对象，将其复制到To空间，释放非存活对象占用的空间 。完成复制后，From 和To角色对换

_老生代空间_  MarkSweep 和Mark-Compack 结合。 

MarkSweep 是标记存活的对象，对于为存活的对象进行清除，结果导致了空间碎片化

Mark-Compack 是处理空间碎片化的算法 ，将或者的对象朝同一侧移动，去除空间碎片化

### 理解Buffer

Buffer 对象的内存分配不再V8内存中，在Node 的C++层面实现的内存申请

对于中文字符要注意使用setEncoding(encode)来设置编码

网络中传输使用Buffer 提高网络吞吐量