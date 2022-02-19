import axios from "axios";
import cheerio from "cheerio";
import express from "express";

const PORT = process.env.PORT || 5000


const app = express()

axios('https://www.news.com.au/').then(res => {
    const htmlData = res.data
    const $ = cheerio.load(htmlData)
    const articles = []
    
    $('.storyblock_title', htmlData).each((index, element) => {
        const title = $(element).children('.storyblock_title_link').text()
        const titleURL = $(element).children('.storyblock_title_link').attr('href')
        articles.push({
            title,
            titleURL
        })
    })
    console.log(articles)
}).catch(err => console.error(err))


app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))