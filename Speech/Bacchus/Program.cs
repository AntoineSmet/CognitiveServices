using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

class Program 
{
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    static string speechKey = "dd567e777529473290923551b85d8773";
    static string speechRegion = "westeurope";
    

    async static Task Main(string[] args)
    {
        var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);      

        // The language of the voice that speaks.
        speechConfig.SpeechSynthesisVoiceName = "en-US-JennyNeural"; 

        using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
        {
            // Get text from the console and synthesize to the default speaker.
            Console.WriteLine("Enter some text that you want to speak >");
            string text = Console.ReadLine();
            var speechSynthesisResult = await speechSynthesizer.SpeakTextAsync(text);
            
        }

        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }
}