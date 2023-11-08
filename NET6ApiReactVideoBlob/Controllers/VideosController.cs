using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NET6ApiReactVideoBlob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        BlobServiceClient serviceClient;
        string blobContainerName = "test-net6-video-blob";

        public VideosController(BlobServiceClient serviceClient)
        {
            this.serviceClient = serviceClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetVideo()
        {
            try
            {
                BlobContainerClient containerClient = serviceClient.GetBlobContainerClient(blobContainerName);
                await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
                {
                    BlobClient blobClient = containerClient.GetBlobClient(blobItem.Name);
                    Stream stream = await blobClient.OpenReadAsync();
                    //// return status code 200
                    //var response = new FileStreamResult(stream, "video/mp4");
                    //// return status code 206
                    var response = File(stream, "video/mp4", enableRangeProcessing: true);
                    return response;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions here, e.g., log the error or return a custom error response.
                return StatusCode(500, "Internal Server Error");
            }
            return BadRequest();
        }



    }
}
