using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

//dotnet add package Microsoft.CognitiveServices.Speech
class Program 
{
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    string subscriptionKey = "key";
    string region = "region (ex : westeurope) ";

    async static Task Main(string[] args)
    {
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);      

        // The language of the voice that speaks.
        speechConfig.SpeechSynthesisVoiceName = "en-US-JennyNeural"; 

        using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
        {
            // Get text from the console and synthesize to the default speaker.
            Console.WriteLine("Entrez votre texte ");
            string text = Console.ReadLine();
            var speechSynthesisResult = await speechSynthesizer.SpeakTextAsync(text);
            
        }

    }
}