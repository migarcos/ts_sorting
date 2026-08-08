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

const dataset: number[] = [5, 3, 8, 1, 2, 9, 4, 7, 6, 0];

function main() {
    try {
        const sorter = new BubbleSort();
        const qsort = new QuickSort();

        console.log("Original dataset:", dataset);

        const sorted = sorter.sort(dataset);
        console.log("Sorted dataset: ", sorted);

        const qsorted = qsort.sort(dataset);
        console.log("With QSort", qsorted);


    } catch (err:any) {
        console.error("Error: ", err.message);
    }
}

main();