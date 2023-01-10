using System;
using System.Threading.Tasks;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

namespace AzureSpeechToText
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // subscription key and region
            string subscriptionKey = "dd567e777529473290923551b85d8773";
            string region = "westeurope";

            var configuration = SpeechConfig.FromSubscription(subscriptionKey, region);

            // for the microphone
            var audioConfig = AudioConfig.FromDefaultMicrophoneInput();

            using (var recognizer = new SpeechRecognizer(configuration, audioConfig))
            {
                Console.WriteLine("Je vous écoute ...");
                // Start recognition and wait for the result
                var result = await recognizer.RecognizeOnceAsync();

                // Check if the result was successful
                if (result.Reason == ResultReason.RecognizedSpeech)
                {
                    // result text
                    Console.WriteLine(result.Text);
                }
                else
                {
                    Console.WriteLine($"Error: {result.Reason}");
                }
            }
        }
    }
}
