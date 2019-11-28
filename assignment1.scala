import scala.annotation.tailrec


object Assignment1 {
  def main(args: Array[String]) {

    val days = List("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday", "Saturday")

    def task1(list: List[String]): Unit = {

      def forLoop(list: List[String]): String = {
        var resultString = ""
    
        for ((value, i) <- list.zipWithIndex){
          resultString += value + (if(i == list.length - 1) "" else ", ")
        }
    
        resultString
      }

      def forLoopWithS(list: List[String]): String = {
        var resultString = ""
    
        for ((value, i) <- list.zipWithIndex){
          if (value(0) == 'S')
            resultString += value + (if(i == list.length - 1) "" else ", ")
        }
    
        resultString
      }

      def whileLoop(list: List[String]): String = {
        var resultString = ""
        var i = 0;

        do {
          resultString += list(i) + (if(i == list.length - 1) "" else ", ")
          i += 1
        } while (i <= list.length - 1)
    
        resultString
      }

      println(forLoop(list))
      println(forLoopWithS(list))
      println(whileLoop(list))
    }

    def task2(list: List[String]): Unit = {

      def recursive(list: List[String]): String = list match { 
        case Nil => ""
        case x :: tail => x + ", " + recursive(tail)
      }

      println(recursive(list))
      println(recursive(list.reverse))

    }

    def task3(list: List[String]): Unit = {

      @tailrec
      def tailRecursive(list: List[String], accum: String): String = {
        list match {
          case Nil => accum
          case x :: tail => tailRecursive(tail, x +  ", " + accum)
        }
      }

      println(tailRecursive(list.reverse, ""))
    }
    

    def task4(list: List[String]): Unit = {
      println(list.foldLeft("") { (z, i) =>
        z + ", " + i
      })

      println(list.foldRight("") { (z, i) =>
        z + ", " + i
      })

      println(list.fold("") { (z, i) =>
        z + ", " + i
      })
    }

    def task5(list: List[String]): Unit = {
      val map = list.zipWithIndex.map({ case (element, index) => 
        (element, (index + 1) * 10)
     }).toMap

     val mapReduced = map.map({case (key, value) => (key, value * 0.9)})


      println(map)
      println(mapReduced)
    }


    def task6(list: List[Int]): Unit = {
      
      def inc(list: List[Int]): List[Int] = {
        list.map({ case (value) => value + 1})
      }


      println(inc(list))
    }



    def task7(list: List[Int]): Unit = {
      
      def absolute(list: List[Int]): List[Int] = {
        val newList = list.map(_.abs).filter(n => (n > -5)&&(n < 12))

        return newList
      }


      println(absolute(list))
    }

    def task8(triple: (String, Int, Double)): Unit = {
      print(triple);
    }

    def task9(list: List[Int]): Unit = {

      @tailrec
      def filter(n: Int, l: List[Int], acc: List[Int] = List[Int]()): List[Int] =  l match {
        case Nil => acc.reverse
        case hd :: tl if(hd == n) => filter(n, tl, acc)
        case hd :: tl            => filter(n, tl, hd :: acc)
      } 

      println(filter(0, list))
    }



    def task10(): Unit = {

      val capitals = Map("France" -> "Paris", "Japan" -> "Tokyo")
      capitals get "France"
      capitals get "North Pole"

      def show(x: Option[String]) = x match {
        case Some(x) => x
        case None => "?"
      }

      def showWithDefault(x: Option[String], default: String) = x match {
        case Some(x) => x
        case None => default
      }

      println(show(capitals get "Japan"))
      println(show(capitals get "France"))
      println(show(capitals get "North Pole"))
      println()
      println(showWithDefault(capitals get "Japan", "Missing"))
      println(showWithDefault(capitals get "France", "Missing"))
      println(showWithDefault(capitals get "North Pole", "Missing"))
    }

    task1(days)
    task2(days)
    task3(days)
    task4(days)
    task5(days)
    task6(List(1,2,3,4,5))
    task6(List(1, 2, 3, 4, 5, 6, -7, -8, 9, 15))
    task8("Hello", 1, 2.2)
    task9(List(1, 0, 2, 0, 3, 4, 5, 0, 6, 0, 9))
    task10()
  }
}