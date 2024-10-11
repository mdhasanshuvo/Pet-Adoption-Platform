// show Category
function category() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(values => showCategory(values.categories))
        .catch(error => console.log(error))
}

function showCategory(values) {
    const categories = document.getElementById('categories');
    for (const value of values) {
        const btn = document.createElement('button')
        btn.innerHTML = `
            <div id="btn_${value.category}" onclick="filterPet('${value.category}')" class="flex h-[100px] border justify-center items-center gap-4 border-[#0e7a8126] rounded-xl category_btn">
                <img class="h-1/2" src="${value.category_icon}" />
                <h3 class="text-[#131313] text-2xl font-bold">${value.category}<h3>
            </div>
        `
        categories.appendChild(btn);

    }
}

category();


// liked pets and details
function likePets(id) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(values => showLikePets(values.petData))
        .catch(error => console.log(error))
}
function showLikePets(value) {
    const likes = document.getElementById('likes');
    const img = document.createElement("div");
    img.innerHTML = `
        <div class="border p-3 lg:p-2 rounded-lg">
            <img class="rounded-lg object-cover w-full" src="${value.image}">
        </div>
    `
    likes.appendChild(img);
}

// show details
function detailsModal(detailsModal) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsModal}`)
        .then(res => res.json())
        .then(values => showdetailsModal(values.petData))
        .catch(error => console.log(error))
}
function showdetailsModal(showdetailsModal) {
    const detailsModal = document.getElementById('modal_content');
    detailsModal.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <img class="object-fill w-full rounded-xl mb-4" src="${showdetailsModal.image}" />
    <h3 class="text-[#131313] text-xl font-bold my-2 ">${showdetailsModal.pet_name}<h3>
    <div class="grid grid-cols-2">
        <div>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon1.svg">Breed: ${showdetailsModal.breed}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Gender: ${showdetailsModal.gender}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Vaccinated status:: ${showdetailsModal.vaccinated_status}</p>
        </div>
        <div>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon2.svg">Birth: ${showdetailsModal.date_of_birth}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (2).svg">Price: ${showdetailsModal.price}</p>
        </div>
        
        
    </div>    
    <br><hr><br> 
    <h4 class="font-bold my-2 text-base">Details Information</h4>
    <p class="text-[#131313b3]">${showdetailsModal.pet_details}</p>

    `
    detailsModal.appendChild(div);
    document.getElementById('detailsModal').click();
}

// show filtered pets
function filterPet(value) {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${value}`)
        .then(res => res.json())
        .then(values => {
            const activeBtn = document.getElementById(`btn_${value}`);
            const remBtn = document.getElementsByClassName("category_btn");
            for (const btn of remBtn) {
                btn.classList.remove('active');
            }
            activeBtn.classList.add('active');
            activeBtn.classList.remove('rounded-xl');
            showPets(values.data);
        })
        .catch(error => console.log(error))
}

// show all pets
function pets() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(values => showPets(values.pets))
        .catch(error => console.log(error))
}

function showPets(values) {
    const pets = document.getElementById('pets');
    pets.innerHTML = "";
    if (values.length == 0) {
        pets.classList.remove("grid");
        pets.innerHTML = `
        <div class="bg-[#13131308]">
            <div class="flex flex-col gap-5 py-24  rounded-xl w-9/12 text-center mx-auto">
                <img class="w-1/4 mx-auto" src="images/error.webp">
                <h4 class="text-3xl font-bold text-[#131313]">No Information Available</h4>
                <p class="text-[#131313b3] font-base font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        </div>
        `;
        return;
    }
    pets.classList.add("grid");
    for (const value of values) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="border flex flex-col border-inherit p-4 rounded-xl space-y-2">
                <img class="object-fill w-full rounded-xl mb-4" src="${value.image}" />
                <h3 class="text-[#131313] text-xl font-bold">${value.pet_name}<h3>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon1.svg">Breed: ${value.breed}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon2.svg">Birth: ${value.date_of_birth}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Gender: ${value.gender}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (2).svg">Price: ${value.price}</p><br><hr><br>
                
                <div class="flex justify-between gap-2">
                    <button onclick="likePets('${value.petId}')" class="flex items-center px-4 border border-[#0e7a8126] py-2 rounded-xl">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>

                    <button onclick="document.getElementById('adoptBtn').click()" class="flex items-center px-4 border border-[#0e7a8126] py-2 rounded-xl text-lg font-semibold text-[#0E7A81]">
                        Adopt
                    </button>

                    <button onclick="detailsModal('${value.petId}')" class="flex items-center px-4  border border-[#0e7a8126] py-2 rounded-xl text-lg font-semibold text-[#0E7A81]">
                        Details
                    </button>
                </div>

            </div>
        `
        pets.appendChild(div)

    }
}



pets();