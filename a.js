function f() {
  this.name2 = 'vivek'
  // this.showName = () => {
  //   console.log(this.name)
  // }

  // this.showName()


  this.show = () => {
    console.log(this.name2)
  }
}

let outer = new f()
outer.name2 = "vivek singh"
// let outer2 = f()
outer.show()
// outer2()

