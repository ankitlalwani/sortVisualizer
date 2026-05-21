import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import ReactSlider from 'react-slider'
import { VerticalRangeSlider } from "vertical-slider";
import { Slider, RangeSlider, Row, Col, Container } from 'rsuite';
import 'rsuite/lib/styles/index.less';
import 'rsuite/dist/styles/rsuite-default.css';
import { wait } from '@testing-library/react';
import './Home.css'


class Home extends React.Component {

     
    constructor(props){
        super(props);
        this.state={
            sleepTime: 0,
            itemsRendered: 0,
            maxValue:200,
            slideValue: 100,
            slidebgColor: "47CF8E",
            type: 'bar',
            data: {
                labels: [0,1],
                datasets: [{
                    label: '',
                    data: [0,1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                        
                    ]
                    
                }]
            },
            options: {
                legend: {
                    display: false

                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true,
                            autoskip: true
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                }
            }

            ,
            description: ""
        }
        this.handleSliderEvent = this.handleSliderEvent.bind(this);
        this.mergeSortSlice=this.mergeSortSlice.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.partition = this.partition.bind(this);
        this.ClickQuickSort=this.ClickQuickSort.bind(this);
        this.ClickMergeSort=this.ClickMergeSort.bind(this);
        this.ClickBubbleSort=this.ClickBubbleSort.bind(this);
        this.bubbleSort=this.bubbleSort.bind(this);
        this.ClickHeapSort=this.ClickHeapSort.bind(this);
        this.heapSort=this.heapSort.bind(this);
        this.heap_root=this.heap_root.bind(this);
        this.currentSortRun = 0;
    }


    componentDidMount(){
        this.getChartData();
        console.log("inside component did mount");
    }

    startSortRun=()=>{
        this.currentSortRun += 1;
        return this.currentSortRun;
    }

    isSortRunActive=(runId)=>{
        return this.currentSortRun === runId;
    }

    getChartData=()=>{
        
       let data1= {
            labels: [0,1],
            datasets: [{
                label: '',
                data: [0,1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                    
                ]
                
            }]
        }
        const slideValue = this.state.slideValue;
        const backColor= ["pink", "purple", "blue", "green", "lightblue", "neon", "red", "lightgreen", "yellow", "grey", "lightgrey", "orange"]
        
        console.log("data1 ", data1);
        console.log("inside getCharData");

        for(let i=0;i<slideValue;i++){
            const randomNumber = Math.ceil(Math.random() * slideValue);

            data1.labels[i]=randomNumber;
            data1.datasets[0].data[i]=randomNumber;
            data1.datasets[0].backgroundColor[i]="lightblue";
        }
        
        this.setState({
            data: data1
        })

    }


    //parent merge sort call
      mergeSort=(runId)=> {

        const data1 = this.state.data;
        let unsortedArray = data1.datasets[0].data;
        // create copy of the array 
       let slicedArray = unsortedArray.slice()
        // asynchronous sort the copy
        this.mergeSortSlice(slicedArray, 0, slicedArray.length, runId);
        return;
    }

        ClickMergeSort(){
                const runId = this.startSortRun();
                this.setState({description: "Merge Sort: A divide-and-conquer algorithm that recursively splits the array into halves, sorts each half, and then merges the sorted halves into a single sorted array. Stable and runs in O(n log n) time."});
                this.mergeSort(runId);
        }

    //recursive merge sort calls for sorting the arrays
    async mergeSortSlice(array, leftIndex, rightIndex, runId) {
        if (!this.isSortRunActive(runId))
            return false;

        if (rightIndex-leftIndex <= 1)
            return true;
        
        let midValue = Math.round((rightIndex+leftIndex) / 2);
    
        // perform recursions
        if (!await this.mergeSortSlice(array, leftIndex, midValue, runId))
            return false;
        if (!await this.mergeSortSlice(array, midValue, rightIndex, runId))
            return false;
    
         // Merge the values in the same array and shift others.
        let i = leftIndex, j = midValue;
        while (i < rightIndex && j < rightIndex) {
            if (!this.isSortRunActive(runId))
                return false;

            let data1 = this.state.data;
            let sleepTime = this.state.sleepTime;
            const slideValue = this.state.slideValue;

            if(slideValue<=10){
                sleepTime=400;
            }else if(slideValue>10&&slideValue<=30){
                sleepTime=300;
            }
            else if(slideValue>30&&slideValue<=50){
                sleepTime=200;
            }else if(slideValue>50&&slideValue<=99){
                sleepTime=100;
            }else if(slideValue>99&&slideValue<=150){
                sleepTime=50;
            }
            else{
                sleepTime=20;
            }
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;
            
            data1.datasets[0].backgroundColor[i]="purple";
            data1.datasets[0].backgroundColor[j]="purple";
            this.setState({data: data1});

            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;

            if (array[i] > array[j]) {
                let tempArray = array[j]; 
                array.splice(j, 1); array.splice(i, 0, tempArray);
                j ++;
            }
            i ++;
            if (i==j) j ++;
    
            // copy back the current state of the sorting
           let values = array.slice();
           console.log("values inside mergesortsplice :", values);
           
           for(let i=0;i<array.length;i++){
            data1.datasets[0].backgroundColor[i]="lightblue";
        }

            // slow down
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;

            console.log("checking for sleep fn")

            
                data1.datasets[0].data=values;
                data1.labels=values;
                
            this.setState({data: data1});

        }

        return true;
    }

    //sleep for the mentioned sleep time
    async sleep(sleepTime) {
        return new Promise(resolve => setTimeout(resolve, sleepTime));
    }
    

    //parent Quick sort call
async ClickQuickSort(){

        const runId = this.startSortRun();
        this.setState({description: "Quick Sort: A divide-and-conquer algorithm that selects a pivot, partitions elements into those less than and greater than the pivot, then recursively sorts the partitions. Average O(n log n), worst-case O(n^2)."});

        const data1 = this.state.data;
        let unsortedArray = data1.datasets[0].data;
        // create copy of the array 
       
    await  this.quickSort(unsortedArray, 0, unsortedArray.length-1, runId);

     /*  data1.datasets[0].data = sortedArray;

       this.setState({
           data: data1
       });*/
    }

    //recursive quick sort calls
  async  quickSort(items, left, right, runId) {
        if (!this.isSortRunActive(runId))
            return false;

        if(left<right){
          let index = await this.partition(items, left, right, runId);
            if (index === null || !this.isSortRunActive(runId))
                return false;
            if (!await this.quickSort(items, left, index - 1, runId))
                return false;
            if (!await this.quickSort(items, index+1, right, runId))
                return false;
        }

        return true;
    }

async  partition(items, left, right, runId) {
        if (!this.isSortRunActive(runId))
            return null;

        let data1 = this.state.data;
            let sleepTime = this.state.sleepTime;
            const slideValue = this.state.slideValue;

            if(slideValue<=10){
                sleepTime=400;
            }else if(slideValue>10&&slideValue<=30){
                sleepTime=300;
            }
            else if(slideValue>30&&slideValue<=50){
                sleepTime=200;
            }else if(slideValue>50&&slideValue<=99){
                sleepTime=100;
            }else if(slideValue>99&&slideValue<=150){
                sleepTime=50;
            }
            else{
                sleepTime=20;
            }
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return null;
        
        let x=items[right];
        let i=left -1;

        for(let j=left; j<right;j++){
            if (!this.isSortRunActive(runId))
                return null;

            if(items[j]<=x){
                i++;
                let temp = items[i];
                items[i] = items[j];
                items[j] = temp;

                data1.datasets[0].backgroundColor[i]="purple";
                data1.datasets[0].backgroundColor[right]="purple";
                this.setState({data: data1});

                await this.sleep(sleepTime);

                if (!this.isSortRunActive(runId))
                    return null;

                for(let i=0;i<items.length;i++){
                    data1.datasets[0].backgroundColor[i]="lightblue";
                }
        
                    // slow down
                    await this.sleep(sleepTime);

                    if (!this.isSortRunActive(runId))
                        return null;
                    
                        data1.datasets[0].data=items;
                        data1.labels=items;
                        
                    this.setState({data: data1});
            }
        }
        i++;

        let temp = items[i];
            items[i] = items[right];
            items[right] = temp;

            data1.datasets[0].backgroundColor[i]="purple";
            data1.datasets[0].backgroundColor[right]="purple";
            this.setState({data: data1});

            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return null;

            for(let i=0;i<items.length;i++){
                data1.datasets[0].backgroundColor[i]="lightblue";
            }
    
                // slow down
                await this.sleep(sleepTime);

                if (!this.isSortRunActive(runId))
                    return null;
    
                console.log("checking for sleep fn")
    
                
                    data1.datasets[0].data=items;
                    data1.labels=items;
                    
                this.setState({data: data1});

        return i;    
        }
        
//click bubble sort
async ClickBubbleSort(){

    const runId = this.startSortRun();
    this.setState({description: "Bubble Sort: A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Easy to understand but inefficient (O(n^2))."});

    const data1 = this.state.data;
    let unsortedArray = data1.datasets[0].data;
    // create copy of the array 
   
    await this.bubbleSort(unsortedArray, runId);

    if (!this.isSortRunActive(runId))
        return;

   data1.datasets[0].data = unsortedArray;

   this.setState({
       data: data1
   });
}

async  bubbleSort(unsortedArray, runId){
    if (!this.isSortRunActive(runId))
        return false;

    let data1 = this.state.data;
            let sleepTime = this.state.sleepTime;
            const slideValue = this.state.slideValue;

            if(slideValue<=10){
                sleepTime=400;
            }else if(slideValue>10&&slideValue<=30){
                sleepTime=300;
            }
            else if(slideValue>30&&slideValue<=50){
                sleepTime=200;
            }else if(slideValue>50&&slideValue<=99){
                sleepTime=100;
            }else if(slideValue>99&&slideValue<=150){
                sleepTime=50;
            }
            else{
                sleepTime=20;
            }
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;

    for(let i=0; i<unsortedArray.length;i++){
        for(let j=0;j<unsortedArray.length;j++){
            if (!this.isSortRunActive(runId))
                return false;

            if(unsortedArray[j]>unsortedArray[j+1]){
                let temp = unsortedArray[j];
                unsortedArray[j]=unsortedArray[j+1];
                unsortedArray[j+1]=temp;

                data1.datasets[0].backgroundColor[j]="purple";
                data1.datasets[0].backgroundColor[j+1]="purple";
                this.setState({data: data1});

                await this.sleep(sleepTime);

                if (!this.isSortRunActive(runId))
                    return false;

                for(let i=0;i<unsortedArray.length;i++){
                    data1.datasets[0].backgroundColor[i]="lightblue";
                }
                    // slow down
                    await this.sleep(sleepTime);

                    if (!this.isSortRunActive(runId))
                        return false;
                    
                        data1.datasets[0].data=unsortedArray;
                        data1.labels=unsortedArray;
                        
                    this.setState({data: data1});

                   // await this.sleep(sleepTime);

            }
        }
    }

    return true;
}




//click heap sort
async ClickHeapSort(){

    const runId = this.startSortRun();
    this.setState({description: "Heap Sort: Builds a binary heap from the input, then repeatedly extracts the maximum (or minimum) to produce a sorted array. Runs in O(n log n) time and is not stable."});

    const data1 = this.state.data;
    let unsortedArray = data1.datasets[0].data;
    // create copy of the array 
   
    await this.heapSort(unsortedArray, runId);

    if (!this.isSortRunActive(runId))
        return;

   data1.datasets[0].data = unsortedArray;

   this.setState({
       data: data1
   });
}



async heapSort(input, runId) {
    if (!this.isSortRunActive(runId))
        return false;

    let data1 = this.state.data;
            let sleepTime = this.state.sleepTime;
            const slideValue = this.state.slideValue;

            if(slideValue<=10){
                sleepTime=400;
            }else if(slideValue>10&&slideValue<=30){
                sleepTime=300;
            }
            else if(slideValue>30&&slideValue<=50){
                sleepTime=200;
            }else if(slideValue>50&&slideValue<=99){
                sleepTime=100;
            }else if(slideValue>99&&slideValue<=150){
                sleepTime=50;
            }
            else{
                sleepTime=20;
            }
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;
    
   let array_length = input.length;

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
       if (!await this.heap_root(input, i,array_length, runId))
            return false;
      }

    for (let i = input.length - 1; i > 0; i--) {
        if (!this.isSortRunActive(runId))
            return false;

        //swapping
        let temp = input[0];
        input[0] = input[i];
        input[i] = temp;
        array_length--;

            data1.datasets[0].backgroundColor[0]="purple";
                data1.datasets[0].backgroundColor[i]="purple";
                this.setState({data: data1});

                await this.sleep(sleepTime);

                if (!this.isSortRunActive(runId))
                    return false;

                for(let i=0;i<input.length;i++){
                    data1.datasets[0].backgroundColor[i]="lightblue";
                }
                    // slow down
                    await this.sleep(sleepTime);

                    if (!this.isSortRunActive(runId))
                        return false;
                    
                        data1.datasets[0].data=input;
                        data1.labels=input;
                        
                    this.setState({data: data1});

                   // await this.sleep(sleepTime);


      
      
      if (!await this.heap_root(input, 0, array_length, runId))
        return false;
    }

    return true;
}



async heap_root(input, i, array_length, runId) {
    if (!this.isSortRunActive(runId))
        return false;

    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;
    
    let data1 = this.state.data;
            let sleepTime = this.state.sleepTime;
            const slideValue = this.state.slideValue;

            if(slideValue<=10){
                sleepTime=400;
            }else if(slideValue>10&&slideValue<=30){
                sleepTime=300;
            }
            else if(slideValue>30&&slideValue<=50){
                sleepTime=200;
            }else if(slideValue>50&&slideValue<=99){
                sleepTime=100;
            }else if(slideValue>99&&slideValue<=150){
                sleepTime=50;
            }
            else{
                sleepTime=20;
            }
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        //swapping
        let temp = input[i];
        input[i] = input[max];
        input[max] = temp;

        data1.datasets[0].backgroundColor[i]="purple";
        data1.datasets[0].backgroundColor[max]="purple";
        this.setState({data: data1});

        await this.sleep(sleepTime);

        if (!this.isSortRunActive(runId))
            return false;

        for(let i=0;i<input.length;i++){
            data1.datasets[0].backgroundColor[i]="lightblue";
        }
            // slow down
            await this.sleep(sleepTime);

            if (!this.isSortRunActive(runId))
                return false;
            
                data1.datasets[0].data=input;
                data1.labels=input;
                
            this.setState({data: data1});

           // await this.sleep(sleepTime);

      if (!await this.heap_root(input, max,array_length, runId))
        return false;
    }

    return true;
}


    //update chart based on the slider value chosen.
    handleSliderEvent = async (event) => {
        let slideValue1 = event;
        
    
        console.log("slideValue :", slideValue1)
    
        this.setState({
            slideValue: slideValue1
        });
        
        this.getChartData();
        console.log(this.state.slideValue);
        
    };

    render() {
        defaults.global.animation = false;
        const type = this.state.type;
        const options = this.state.options;
        const maxValue = this.state.maxValue;
        const data = this.state.data;
        const slideValue = this.state.slideValue;
        const value = this.state.value;

        console.log("data: ", data);
        console.log("type: ", type);
        console.log("options: ", options);
        console.log("SlideValue:", slideValue)


        return (
            console.log("data2: ", data),
            console.log("type2: ", type),
            console.log("options2: ", options),
            console.log("SlideValue2:", slideValue),
            
                <Container className="sort-app">
                    <div className="sort-app__header">
                      <p className="blink">Sort Visualizer</p>
                    </div>
                <div className="visualizer-panel">
                    <div className="slider-panel">
                        <span className="slider-panel__label">Items</span>
                    <Slider
                        defaultValue={slideValue}
                        vertical 
                        progress
                        min = {0}
                        max = {maxValue}
                        onChange = {this.handleSliderEvent}
                    />                    
                    </div>
                    <div className="chart-panel">
                        <Bar 
                        type = {type}
                        options={options}
                        data = {data} 
                        redraw
                        />
                    </div> 
                </div>
                
                <div className="sort-actions" aria-label="Sorting algorithms">
                    <button className="sort-button" onClick={this.ClickMergeSort}>Merge Sort</button>
                    <button className="sort-button" onClick={this.ClickQuickSort}>Quick Sort</button>
                    <button className="sort-button" onClick={this.ClickBubbleSort}>Bubble Sort</button>
                    <button className="sort-button" onClick={this.ClickHeapSort}>Heap Sort</button>
                </div>
                <div className="algorithm-details">
                    <strong>Algorithm details:</strong>
                    <p>{this.state.description}</p>
                </div>
                
                </Container>

        );
      }
    }

export default Home;
