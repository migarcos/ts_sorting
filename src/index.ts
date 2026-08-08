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

const dataset: number[] = [5, 3, 8, 1, 2, 9, 4, 7, 6, 0];

function main() {
    try {
        const sorter = new BubbleSort();
        console.log("Original dataset:", dataset);

        const sorted = sorter.sort(dataset);
        console.log("Sorted dataset: ", sorted);
    } catch (err:any) {
        console.error("Error: ", err.message);
    }
}

main();