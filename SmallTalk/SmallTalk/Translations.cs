namespace SmallTalk
{
    public class Translations
    {

        public class Rootobject
        {
            public Class1[] Property1 { get; set; }
        }

        public class Class1
        {
            public Detectedlanguage detectedLanguage { get; set; }
            public Translation[] translations { get; set; }
        }

        public class Detectedlanguage
        {
            public string language { get; set; }
            public float score { get; set; }
        }

        public class Translation
        {
            public string text { get; set; }
            public string to { get; set; }
        }

        public class TranslationRequest
        {
            public string TextToTranslate { get; set; }
            public string TargetLanguageCode { get; set; }
        }


        public class TransliterationRequest
        {
            public string Text { get; set; }
            public string Language { get; set; }
            public string FromScript { get; set; }
            public string ToScript { get; set; }
        }


        public class TransliterationResult
        {
            public string Text { get; set; }
            public string Script { get; set; }
        }



    }
}
