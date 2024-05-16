### 一.JS中this的指向

#### 1.this绑定

- **<font color='red'>只有函数被执行的那一刻，才会决定函数内部的this所绑定的对象</font>**

- **<font color='red'>函数内部this所绑定的对象只与该函数的调用方式有关</font>**

#### 2.this的默认绑定

- **<font color='red'>默认绑定</font>：函数独立调用，内部this绑定window对象**

![image-20240516205642951](.\IMG_MD\image-20240516205642951.png)

- **<font color='red'>函数赋值后进行独立调用</font>，内部this绑定window对象**

![image-20240516210025642](.\IMG_MD\image-20240516210025642.png)

- **<font color='red'>严格模式下进行独立调用</font>，内部this绑定undefined**

![image-20240516210307194](.\IMG_MD\image-20240516210307194.png)

#### 3.this的隐式绑定

- **<font color='red'>隐示绑定</font>：函数通过对象进行调用，this绑定函数发起的对象**

![image-20240516210848304](.\IMG_MD\image-20240516210848304.png)

#### 4.this的new绑定

- **<font color='red'>函数可以当做类来进行new实例构造</font>**
- **<font color='red'>new的时候会创建一个空对象，并将函数内部的this绑定该对象</font>**
- **<font color='red'>再执行函数内部的代码</font>**
- **<font color='red'>最终返回new出来的新对象（该对象与new的函数同名）</font>**

![image-20240516212120413](.\IMG_MD\image-20240516212120413-1715871229192-5.png)

#### 5.this的显式绑定

- **<font color='red'>apply(thisObj, [arg1, arg2, ...])</font>：函数调用时显式的指定this所绑定的对象，第二个参数为传入的参数列表**

![image-20240516214702263](.\IMG_MD\image-20240516214702263.png)

- **<font color='red'>call(thisObj, arg1, arg2, ...)</font>：函数调用时显式的指定this所绑定的对象，后续参数为传入的实参**

![image-20240516215113837](.\IMG_MD\image-20240516215113837.png)

- **<font color='red'>bind(thisObj, arg1, arg2, ...)</font>：与call调用方式一致，只不过可以返回一个函数对象，该函数对象已经显示的指定this所绑定的对象，所以后续调用无需指定this**

![image-20240516215605259](.\IMG_MD\image-20240516215605259.png)

#### 6.this绑定的优先级

- **<font color='red'>默认绑定（独立调用）的优先级最低</font>**

- **<font color='red'>new绑定的优先级最高</font>**
- **<font color='red'>显示绑定的优先级高于隐式绑定</font>**
- **<font color='red'>bind绑定高于apply、call绑定</font>**

![image-20240516223640102](.\IMG_MD\image-20240516223640102.png)

















