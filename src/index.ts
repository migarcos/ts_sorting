import * as readLine from 'readline';

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

function timeMeasure(label: String, fn:() => void): number {
    const start = Date.now();
    fn();
    const end = Date.now();
    return end - start; 
}

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
            const dataset = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
            const bsort = new BubbleSort();
            const qsort = new QuickSort();
            const msort = new MergeSort();

            // console.log("Original dataset:", dataset);

            const bubbleTime = timeMeasure("Bubblesort", () => bsort.sort(dataset));
            // console.log("Sorted dataset: ", sorted);
            const quickTime = timeMeasure("QuickSort", () => qsort.sort(dataset));
            // const qsorted = qsort.sort(dataset);
            // console.log("With QSort", qsorted);
            const mergeTime = timeMeasure("MergeSort", () => msort.sort(dataset));
            console.log("\n = = =   PERFORMANCE  = = = ");
            console.log(`Dataset size: ${dataset.length}`);
            console.table([
                { Algorithm: "BubbleSort", "Time (ms)" : bubbleTime},
                { Algorithm: "QuickSort", "Time (ms)" : quickTime},
                { Algorithm: "MergeSort", "Time (ms)" : mergeTime},
            ]);

            // rl.close();

        } catch (err:any) {
            console.error("Error: ", err.message);
        }

    // });
    
}

main();