// import package readLine to read form keyboard
import * as readLine from 'readline';

class BubbleSort {
    sort(data: number[]): number[] {
        if (data.length === 0) {
            throw new Error('dataset cannot be empty!');
        }
        // a copy from the original to order
        const arr = [...data];
        // every loop lopks for the nighest value
        for (let i = 0; i < arr.length; i++) {
            // exchange the highest value with the lowest
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}
// A new version of QuickSort to avoid stack fails 
class QuickSortIterative {
  sort(data: number[]): number[] {
    const arr = [...data];
    const stack: [number, number][] = [[0, arr.length - 1]];

    while (stack.length) {
      const [low, high] = stack.pop()!;
      if (low < high) {
        const p = this.partition(arr, low, high);
        stack.push([low, p - 1]);
        stack.push([p + 1, high]);
      }
    }
    return arr;
  }

  private partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  }
}
// first version to Quicksort works weel with sizes lowesst tha 21000
class QuickSort {
    sort(data: number[]): number[] {
        // if the size array is 1 o less, data ordered
        if (data.length <= 1) return data;
        // pivot help to dive the array in 2 
        const pivot = data[data.length -1];
        // elements lowest than pivot
        const left =  data.filter(x => x < pivot);    
        // elements highest than pivot 
        const right =  data.filter(x => x > pivot);
        const equal =  data.filter(x => x === pivot);
        // recursion to order
        return [...this.sort(left), ...equal, ...this.sort(right)];
    }
}

class MergeSortIterative {
  sort(data: number[]): number[] {
    let arr = [...data];
    for (let size = 1; size < arr.length; size *= 2) {
      for (let left = 0; left < arr.length - size; left += 2 * size) {
        const mid = left + size;
        const right = Math.min(left + 2 * size, arr.length);
        arr = [
          ...arr.slice(0, left),
          ...this.merge(arr.slice(left, mid), arr.slice(mid, right)),
          ...arr.slice(right)
        ];
      }
    }
    return arr;
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }
}

class MergeSort {
    sort(data: number[]): number[] {
        if (data.length <= 1) return data;
        const mid = Math.floor(data.length /2);
        const left = this.sort(data.slice(0, mid));
        const right = this.sort(data.slice(mid));
        return this.merge(left, right);
    }

    private merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        return [...result, ...left.slice(i), ...right.slice(j)];
    }
}

class HeapSort {
    sort(data: number[]): number[]  {
        if (data.length === 0) throw new Error("Dataset cannot be emoty");
        const arr = [...data];
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }

        for (let i = n - 1; i >= 0; i--) {
            [arr[0], arr[i]] = [ arr[i], arr[0] ];
            this.heapify(arr, n, i);
        }
        return arr;
    }

    private heapify(arr: number[], n: number, i: number ) {
        let largest =i;
        const left = 2 + i + 1;
        const right = 2 + i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            [arr[i], arr[largest]] = [ arr[largest], arr[i] ];
            this.heapify(arr, n, largest);
        }
    }
}

function timeMeasure(label: string, fn:() => void): number {
    // to track the start time
    const start = Date.now();
    // executed the function passed in the argument
    fn();
    // track the time after complete the function
    const end = Date.now();
    // return the elapsed time to run the funtion passed
    return end - start; 
}
// asking to user about the dataset size
function askSize(query: string): Promise<string> {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// * simultaneous callin is possible if every sort is called as async to send its answer *
async function runBubble( dataset: number[]) {
    const bsort = new BubbleSort();
    const bubbleTime = timeMeasure("Bubble Sort", () => bsort.sort(dataset));
    return { Algorithm: "Bubble Sort", "Time (ms)" : bubbleTime};
}

async function runQuick( dataset: number[]) {
    const qsort = new QuickSortIterative();
    const quickTime = timeMeasure("Quick Sort", () => qsort.sort(dataset));
    return { Algorithm: "QuickSort", "Time (ms)" : quickTime};
}

async function runHeap( dataset: number[]) {
    const hsort = new HeapSort();
     const heapTime = timeMeasure("Heap Sort", () => hsort.sort(dataset));
    return { Algorithm: "Heap Sort", "Time (ms)" : heapTime};
}

async function runMerge( dataset: number[]) {
    const msort = new MergeSort();
    const mergeTime = timeMeasure("Merge Sort", () => msort.sort(dataset));
    return { Algorithm: "Merge Sort", "Time (ms)" : mergeTime};
}

// main is async to wait the user Answer when call askSize funtion
async function main() {
    // console entry setup
    // const rl = readLine.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rl.question("Write the dataset size: ", (answer) => {
    //     const size = parseInt(answer);

    //     if (isNaN(size) || size <= 0) {
    //         console.error("A valid number is greatest than 0.")
    //         rl.close();
    //         return;
    //     }
        
        try {
            const usrEntry = await askSize("Write the dataset size: ");
            const size = parseInt(usrEntry);
            // dataset create an array using 'size' to populate with random numbers from 1 to 10000
            const dataset = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
            
            
            const results = await Promise.all([
                runBubble(dataset),
                runQuick(dataset),
                runHeap(dataset),
                runMerge(dataset)
            ]);
            
            const sortedResults = results.sort((a, b) => a["Time (ms)"] - b["Time (ms)"]);
            // console.log("Original dataset:", dataset);
            
            // every sort is called to mearure the perfomance
            
            // console.log("Sorted dataset: ", sorted);
            
            // const qsorted = qsort.sort(dataset);
            // console.log("With QSort", qsorted);
            
           

            console.log("\n = = =   PERFORMANCE  = = = ");
            console.log(`Dataset size: ${dataset.length}`);
            console.table(results);


            // rl.close();

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Error:", err.message);
            } else {
                console.error("Unknown error:", err);
            }
        }
        // 156:22  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
        //     catch (err:any) {
        //     console.error("Error: ", err.message);
        // }

    // });
    
}

main(); 