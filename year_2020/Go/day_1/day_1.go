package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {

	// Opening the input file
	content, err := ioutil.ReadFile("day_input.txt")
	if err != nil {
		//Do something
	}
	lines := strings.Split(string(content), "\n") // making the file an array of strings

	var result int    // will contain answer
	var resultTwo int // will contain answer to part 2
	for i := 0; i < len(lines); i++ {

		tmpElem, _ := strconv.Atoi(lines[i]) // converting string to integer

		for inner_i := 1; inner_i < (len(lines) - 1); inner_i++ {

			tmpInner, _ := strconv.Atoi(lines[inner_i]) // converting string to integer

			if tmpInner+tmpElem == 2020 {

				result = tmpElem * tmpInner
			}
			for moreInner := 1; moreInner < (len(lines) - 2); moreInner++ {

				tmpMoreInner, _ := strconv.Atoi(lines[moreInner]) // converting string to integer

				if tmpElem+tmpInner+tmpMoreInner == 2020 {

					resultTwo = tmpElem * tmpInner * tmpMoreInner
				}
			}
		}
	}

	fmt.Printf("Answer to Part I: %v", result)
	fmt.Printf("\nAnswer to Part II: %v", resultTwo)

}
