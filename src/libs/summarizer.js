const options = {
    sharedContext: 'This is a scientific article',
    type: 'key-points',
    format: 'markdown',
    length: 'medium',
  };

  
const languageSummarizerInitializer = async () => {

    let summarizer;

    try{

        // check summarizer capabilities for summarizer
        const capabilities = await self.ai.summarizer.capabilities();

        const available = capabilities.available
        console.log('Summarizer API availability:', capabilities.available)
        
        if (available === 'no') {
            // The Summarizer API isn't usable.
            console.warn('Summarizer API not available')
            return null;
        }
        

        if (available === 'readily') {
            
            // The Summarizer API can be used immediately .
            summarizer = await self.ai.summarizer.create(options);
            // console.error('Summarizer creation failed!')
            // return null

        }else{

            // The Summarizer API can be used after the model is downloaded.
            summarizer = await self.ai.summarizer.create(options);
            summarizer.addEventListener('downloadprogress', (e) => {
                console.log(e.loaded, e.total);
            });

            await summarizer.ready;
            console.log('Summarizer ready.')

        }
   
        return summarizer

    }catch(error) {
        console.error("Error initializing summarizer:", error)
        return null
    }
}

const summarizeText = async (text) =>{
    const summarizer = await languageSummarizerInitializer()
    console.log(summarizer, text);
    const summary = await summarizer.summarize(text)
    return summary
}


export default summarizeText;