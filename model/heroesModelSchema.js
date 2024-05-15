const { default: mongoose } = require('mongoose');
const express = require('mongoose');
const { Schema } = mongoose;

const heroesSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: Array,
        required: true
    },
    damageType:{
        type: String,
        required: true
    },
    relation:{
        name: {
            type: String,
            required: true
        },
        bond: {
            type: String,
            required: true
        }
    }
})


const heroes = mongoose.model('heroes',heroesSchema);    // 'heroes' is the collection name

module.exports = heroes