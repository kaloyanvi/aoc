package main

import (
	"fmt"
)

func lastElement(count_array [10][3]int, turn_number int, last_element int) int {

	new_number := turn_number - count_array[last_element][2]
	return new_number

}

func findMax(array [10][3]int) []int {

	var vals []int
	for i := 0; i <= len(array)-1; i++ {
		vals = append(vals, array[i][2])
	}
	return sort(vals)
}

func main() {

	array := [3]int{1, 3, 2}                                                                                                                // input array
	count_array := [10][3]int{{0, 0, 0}, {1, 0, 0}, {2, 0, 0}, {3, 0, 0}, {4, 0, 0}, {5, 0, 0}, {6, 0, 0}, {7, 0, 0}, {8, 0, 0}, {9, 0, 0}} // two dimensional integer array of 10 elements

	fmt.Printf("Array %v", array)
	var turn_number int
	for i := 0; i < 2020; i++ {

		element := array[i]

		if i < len(array)-1 {

			fmt.Println("\nNot last element:")

			fmt.Printf("\nElement %v", array[i])

			count_array[element][1]++       // counting occurences of element
			count_array[element][2] = i + 1 // adding the turn it was spoken

			fmt.Printf("\nCount Array %v", count_array[element])
			turn_number++

		} else if i == len(array)-1 {
			fmt.Println("\nLast element:")

			// last_element := array[len(array)-1]
			last_element := findMax(count_array)
			fmt.Printf("Last element %v", last_element)
			// 	// checking last number
			// if count_array[last_element][1] == 1 { // first time spoken
			// 	fmt.Println("\nFirst time spoken")

			// 	count_array[last_element][1]++
			// 	count_array[element][2] = i + 1 // adding the turn it was spoken
			// 	fmt.Printf("\nOnly once: %v", count_array[last_element])
			// 	turn_number++

			// 	} else {

			// 		new_numb := lastElement(count_array, turn_number, last_element)
			// 		count_array[new_numb][1]++
			// 		count_array[new_numb][2] = i + 1
			// 		turn_number++
			// }

			// }
		}
		fmt.Printf("\n\n Array final: %v", count_array)
	}
}
