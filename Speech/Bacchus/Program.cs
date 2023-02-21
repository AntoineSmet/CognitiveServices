using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

//dotnet add package Microsoft.CognitiveServices.Speech
class Program 
{
    // Config
    string subscriptionKey = "key";
    string region = "region (ex : westeurope) ";

    async static Task Main(string[] args)
    {
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);      
        speechConfig.SpeechSynthesisVoiceName = "en-US-JennyNeural"; 
        using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
        {
            // enter text
            Console.WriteLine("Entrez votre texte ");
            string text = Console.ReadLine();
            var speechSynthesisResult = await speechSynthesizer.SpeakTextAsync(text);
        }
    }
}