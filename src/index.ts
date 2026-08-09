class BubbleSort {
    sort(data: number[]): number[] {
        if (data.length === 0) {
            throw new Error('dataset cannot be empty!');
        }
        const arr = [...data];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}

class QuickSort {
    sort(data: number[]): number[] {
        if (data.length <= 1) return data;
        const pivot = data[data.length -1];
        const left =  data.filter(x => x < pivot);     
        const right =  data.filter(x => x > pivot);
        const equal =  data.filter(x => x === pivot);
        return [...this.sort(left), ...equal, ...this.sort(right)];
    }
}

function timeMeasure(label: String, fn:() => void): number {
    const start = Date.now();
    fn();
    const end = Date.now();
    return end - start; 
}

function main() {
    try {
        const dataset = Array.from( {length:10000}, () => Math.floor(Math.random() * 10000));
        const bsort = new BubbleSort();
        const qsort = new QuickSort();

        // console.log("Original dataset:", dataset);

        const bubbleTime = timeMeasure("Bubblesort", () => bsort.sort(dataset));
        // console.log("Sorted dataset: ", sorted);
        const quickTime = timeMeasure("QuickSort", () => qsort.sort(dataset));
        // const qsorted = qsort.sort(dataset);
        // console.log("With QSort", qsorted);

        console.log("\n = = =   PERFORMANCE  = = = ");
        console.log(`Dataset size: ${dataset.length}`);
        console.table([
            { Algorithm: "BubbleSort", "Time (ms)" : bubbleTime},
            { Algorithm: "QuickSort", "Time (ms)" : quickTime},
        ]);
    } catch (err:any) {
        console.error("Error: ", err.message);
    }
}

main();