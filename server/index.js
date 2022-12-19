const express = require('express')
const app = express()

app.get('/hello', (req,res)=>{
    res.send('ola four loops')
})

app.listen(1337,()=>{
    console.log('Server started on 1337')
})