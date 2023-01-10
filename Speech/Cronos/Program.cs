﻿using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.CognitiveServices.Speech.Translation;

class Program 
{
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    string subscriptionKey = "key";
    string region = "region (ex : westeurope) ";

    static void OutputSpeechRecognitionResult(TranslationRecognitionResult translationRecognitionResult)
    {
        switch (translationRecognitionResult.Reason)
        {
            case ResultReason.TranslatedSpeech:
                foreach (var element in translationRecognitionResult.Translations)
                {
                    Console.WriteLine($"Traduction : {element.Value}");
                }
                break;
            case ResultReason.NoMatch:
                Console.WriteLine($"Error");
                break;
        }
    }

    async static Task Main(string[] args)
    {
        var speechTranslationConfig = SpeechTranslationConfig.FromSubscription(speechKey, speechRegion);        
        speechTranslationConfig.SpeechRecognitionLanguage = "fr-FR";
        speechTranslationConfig.AddTargetLanguage("en");

        using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
        using var translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);

        Console.WriteLine("Je vous écoute ...");
        var translationRecognitionResult = await translationRecognizer.RecognizeOnceAsync();
        OutputSpeechRecognitionResult(translationRecognitionResult);
    }
}