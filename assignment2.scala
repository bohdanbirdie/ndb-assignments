import scala.annotation.tailrec


object Assignment2 {
  def main(args: Array[String]) {

    val days = List("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday", "Saturday")

    def task1(list: List[String]): Unit = {

      def checkDay(dayName: String): String = {
        dayName match {
          case "Saturday" | "Sunday" => "weekend"
          case _ => "weekday"
        }
      }

      list.foreach(day => println(checkDay(day)))
    }

    def task2(): Unit = {

      class BankAccount(private var currentBalance: Double) {

        def this() {
          this(0);
        }

        def deposit(incoming: Double) {
          currentBalance += incoming;
        }

        def withdraw(outcoming: Double) {
          currentBalance -= outcoming;
        }
      }

    }

    def task3(): Unit = {

      class Person(val firstName: String, val lastName: String) {
        
      }

      val Person1 = new Person("John", "Dou")
      val Person2 = new Person("Barbara", "Liskov")
      val Person3 = new Person("Lil", "Wayne")

      def greet(person: Person): String = {
        person.firstName match {
          case "John" => "Hello, boss"
          case "Barbara" => "Hello, Barbara"
          case "Lil" => "Hello, Wayne"
        }
      }

      println(greet(Person1))
      println(greet(Person2))
      println(greet(Person3))
    }
    

    def task4(): Unit = {
      def intHandler(value: Int, callback: Int => Int): Int = {
        callback(callback(callback(value)))
      }

      println(intHandler(10, (value: Int) => value * 10))
    }

    def task5(): Unit = {

      trait Employee extends Person {
        var salary: Double;

        override def taxToPay(): Double = {
          return salary * 0.2;
        }

      }

      class Person (val firstName: String, val lastName: String, private val _taxToPay: Double) {
        def taxToPay = _taxToPay;
      }

      trait Student extends Person {
        override def taxToPay(): Double = {
          return 0.0;
        }

      }

      trait Teacher extends Employee {
        override def taxToPay(): Double = {
          return salary * 0.1;
        }
      }

      
      val employee1 = new Person("John", "Dou", 10) with Employee;

      println(employee1)
    }


    // task1(days)
    // task2()
    // task3()
    // task4()
    task5()
    
  }
}