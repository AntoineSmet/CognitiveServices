using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

namespace AzureSpeechToText
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // subscription key and region
            string subscriptionKey = "key";
            string region = "region (ex : westeurope) ";
            var configuration = SpeechConfig.FromSubscription(subscriptionKey, region);
            // for the microphone
            var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
            using (var recognizer = new SpeechRecognizer(configuration, audioConfig))
            {
                Console.WriteLine("Je vous écoute ...");
                var result = await recognizer.RecognizeOnceAsync();
                Console.WriteLine(result.Text);
            }
        }
    }
}