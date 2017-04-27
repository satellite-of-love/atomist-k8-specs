package com.jessitron;

public class Survey {

    // default constructor for deserialization
    public Survey() {
    }

    public Int seed;

    public Int getSeed() {
        return seed;
    }

    public void setSeed(Int seed) {
        this.seed = seed;
    }

    public Survey(Int seed) {
        this.seed = seed;
    }
}
