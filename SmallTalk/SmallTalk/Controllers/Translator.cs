using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

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

        [HttpPost]
        public async Task<IActionResult> TranslateText([FromBody] string textToTranslate)
        {
            string route = "/translate?api-version=3.0&to=en&to=it";
            object[] body = new object[] { new { Text = textToTranslate } };
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

                return Ok(result);
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

