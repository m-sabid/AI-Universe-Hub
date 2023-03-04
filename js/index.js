fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((res) => res.json())
  .then((data) => displayAiCard(data.data.tools));

//   Remove All Data Filter
document.getElementById("sort-by-date-all").style.display = "none";
document.getElementById("sort-by-date-btn").style.display = "block";

function displayAiCard(tools) {
  const firstSix = tools.slice(0, 6);

  const postCards = document.getElementById("cards");

  for (const singleTool of firstSix) {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = ` 
        <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div class="rounded-lg overflow-hidden h-[200px]">
            <img class="p-2 w-full h-full object-cover" src=${singleTool.image} alt="" />
        </div>

        <div class="p-5">
            <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Features</h5>

            <ol class="list-decimal mx-6 my-3">
                <li>${singleTool.features[0]}</li>
                <li>${singleTool.features[1]}</li>
                <li>${singleTool.features[2]}</li>
            </ol>
        </div>

        <hr>
        <!-- hr--------------- -->

        <div class="m-5 flex items-center justify-between">

            <div class="div">
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${singleTool.name}
                </h5>

                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-calendar-week" viewBox="0 0 16 16">
                        <path
                            d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                        <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <p>${singleTool.published_in}</p>
                </div>

            </div>

            <div>
                <button onclick="openModal('${singleTool.id}')"
                    class="h-[30px] w-[30px] rounded-full bg-[#FEF7F7] hover:bg-gray-300 flex items-center justify-center">
                    <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

        </div>
    </div>
    `;
    postCards.appendChild(postDiv);
  }
}

// Modal
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");

// When user click for details
function openModal(id) {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const toolData = data.data;

      console.log("_____", toolData);

      //   Modal Title
      if (toolData.description === null) {
        document.getElementById(
          "modal-description"
        ).innerHTML = `<p class="text-red-500"> No Description Found... </p>`;
      } else {
        document.getElementById("modal-description").innerHTML =
          toolData.description;
      }

      //   Modal Pricing
      document.getElementById("pricing-1").innerHTML =
        toolData.pricing[0].price == "0"
          ? "Free Of Cost / Free"
          : toolData.pricing[0].price + "<br />" + toolData.pricing[0].plan;
      document.getElementById("pricing-2").innerHTML =
        toolData.pricing[1].price + "<br />" + toolData.pricing[1].plan;
      document.getElementById("pricing-3").innerHTML =
        toolData.pricing[2].price + "<br />" + toolData.pricing[2].plan;

      //   Modal Features
      document.getElementById("modal-feature-1").innerHTML =
        toolData.features[1].feature_name;
      document.getElementById("modal-feature-2").innerHTML =
        toolData.features[2].feature_name;
      document.getElementById("modal-feature-3").innerHTML =
        toolData.features[3].feature_name;

      //   Modal Integrations
      if (toolData.integrations.length <= 0) {
        document.getElementById("modal-integrations-1").innerHTML =
          "No data Found";
      } else {
        document.getElementById("modal-integrations-1").innerHTML =
          toolData.integrations[0] === undefined ? "No data" : toolData.integrations[0];
        document.getElementById("modal-integrations-2").innerHTML =
          toolData.integrations[1] === undefined ? "No data" : toolData.integrations[1];
        document.getElementById("modal-integrations-3").innerHTML =
          toolData.integrations[2] === undefined ? "No data" : toolData.integrations[2];
      }

      // Modal Image
      document.getElementById("modal-image").src = toolData.image_link[0];

      // Modal Accuracy
      if (toolData.accuracy.score === null) {
        document.getElementById("modal-accuracy").style.display = "none";
    } else {
        document.getElementById("modal-accuracy").style.display = "block";
        document.getElementById("modal-accuracy").innerHTML =
          toolData.accuracy.score * 100 + "%" + " " + "accuracy";
      }

      // Modal Accuracy
      document.getElementById("modal-input-examples").innerHTML =
        toolData.input_output_examples[0].input;
      document.getElementById("modal-output-examples").innerHTML =
        toolData.input_output_examples[0].output;

      //
    });

  // const product = products.find((p) => p.id === productId);
  modal.classList.remove("hidden");
}


