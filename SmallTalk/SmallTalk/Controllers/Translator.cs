using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static SmallTalk.Translations;

namespace SmallTalk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TranslationController : ControllerBase
    {
        private Secrets secrets;
        private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com";
        private static readonly string location = "EastUS";
        private readonly HttpClient httpClient;

        public TranslationController()
        {
            httpClient = new HttpClient();
            secrets= new Secrets();
        }

        public class TranslationResponse
        {
            public string Translation { get; set; }
        }

        [HttpPost("Translate")]
        public async Task<IActionResult> TranslateText([FromBody] TranslationRequest translationRequest)
        {
            string route = $"/translate?api-version=3.0&to={translationRequest.TargetLanguageCode}";
            object[] body = new object[] { new { Text = translationRequest.TextToTranslate } };
            var requestBody = JsonConvert.SerializeObject(body);

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(endpoint + route);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", secrets.secretApiKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", location);

                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                string result = await response.Content.ReadAsStringAsync();

                var translationResponse = new TranslationResponse
                {
                    Translation = result
                };

                return Ok(translationResponse);
            }
        }


        [HttpPost("Transliterate")]
        public async Task<IActionResult> TransliterateText([FromBody] TransliterationRequest transliterationRequest)
        {
            string route = $"/transliterate?api-version=3.0&language={transliterationRequest.Language}&fromScript={transliterationRequest.FromScript}&toScript={transliterationRequest.ToScript}";
            string url = $"{endpoint}{route}";

            var requestBody = JsonConvert.SerializeObject(new List<TransliterationRequest> { transliterationRequest });

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, url))
            {
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", secrets.secretApiKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", location);

                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                string result = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var transliterationResponse = JsonConvert.DeserializeObject<List<TransliterationResult>>(result);
                    return Ok(transliterationResponse);
                }
                else
                {
                    // Handle the error response
                    return StatusCode((int)response.StatusCode, result);
                }
            }
        }



        [HttpGet]
        public async Task<IActionResult> GetLanguages()
        {
            string url = "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation";

            HttpResponseMessage response = await httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();

                // Your code logic with the response body here

                return Ok(responseBody); // Example: Returning the response body as Ok result
            }
            else
            {
                // Handle the case where the request was not successful
                return StatusCode((int)response.StatusCode);
            }
        }
    }
}

