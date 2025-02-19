
const languageTranslatorInitializer = async (source, target) => {

    let translator;
   
    // check translator capabilityies for language pair
    const translatorCapabilities = await self.ai.translator.capabilities();

    let canTranslate = translatorCapabilities.capabilities;


    // check translator status
    if (canTranslate === 'no') {
        // The language translator isn't usable.
        return;
    }
    if (canTranslate === 'readily') {
        // The language translator can immediately be used.
        translator = await self.ai.translator.create();
    } else {
        // The language translator can be used after model download.
        translator = await self.ai.languageDetector.create({
            monitor(m) {
                m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                });
              },
        });
        await translator.ready;
    }


    if(!translatorCapabilities.languagePairAvailable(source, target)){
       
        console.error(`Translation not supported between ${source}  and ${target}`)
        return null
    }
    
    translator = await self.ai.translator.create({
        sourceLanguage: source,
        targetLanguage: target,
    }); 
    
    return translator

}

const translateLang = async (source, target, text) =>{

   
    const translator = await languageTranslatorInitializer(source, target)

    if(!translator){
        console.error('Translation for language not available')
        return null
    }
    
    try {
        const result = await translator.translate(text)
        return result
    } catch (error) {
        console.error('Translation failed:', error)
        return null
    }

}


export default translateLang