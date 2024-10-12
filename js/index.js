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
            <div id="btn_${value.category}" onclick="loading('${value.category}')" class="flex h-[100px] border justify-center items-center gap-4 border-[#0e7a8126] rounded-xl category_btn">
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


// show filtered pets
function filterPet(value) {
    document.getElementById('spinner').classList.add('hidden');
    const pets = document.getElementById('pets');
    pets.classList.add("grid");
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${value}`)
        .then(res => res.json())
        .then(values => {
            // showPets(values.data);

            sortPets(values.data);
           
        })
        .catch(error => console.log(error));
}


// loading 
function loading(value){
    const activeBtn = document.getElementById(`btn_${value}`);
    const remBtn = document.getElementsByClassName("category_btn");
    for (const btn of remBtn) {
        btn.classList.remove('active');
    }
    activeBtn.classList.add('active');
    activeBtn.classList.remove('rounded-xl');

    document.getElementById('spinner').classList.remove('hidden');

    const pets = document.getElementById('pets');
    pets.innerHTML = "";
    pets.classList.remove("grid");

    setTimeout(function(){
        filterPet(value);

    },3000);
}


// show all pets
function pets() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(values => {
            setTimeout(function(){
                showPets(values.pets)
                document.getElementById('spinner').classList.remove('hidden');
            },3000);
        })
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
                <p class="text-[#131313b3] font-base font-normal">It is a long established fact that a reader will be distracted by the readable content of a pprice when looking at 
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
                <img class="object-fill w-full rounded-xl mb-4" src="${value?.image??"Not available"}" />
                <h3 class="text-[#131313] text-xl font-bold">${value?.pet_name??"Not available"}<h3>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon1.svg">Breed: ${value?.breed??"Not available"}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon2.svg">Birth: ${value?.date_of_birth??"Not available"}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Gender: ${value?.gender??"Not available"}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (2).svg">Price: ${value?.price??"Not available"}</p><br><hr><br>
                
                <div class="flex justify-between gap-2">
                    <button onclick="likePets('${value.petId}')" class="flex items-center px-4 border border-[#0e7a8126] py-2 rounded-xl">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>

                    <button id="adoptBtn_${value.petId}" onclick="adoptBtnFn(${value.petId})" class="flex items-center px-4 border border-[#0e7a8126] py-2 rounded-xl text-lg font-semibold text-[#0E7A81]">
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


// sort by price
function sort() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(values => sortPets(values.pets))
        .catch(error => console.log(error))
}
function sortPets(pets) {
    pets.sort((a, b) => (
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
    showPets(pets)
}


// show details modal
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
    <img class="object-fill w-full rounded-xl mb-4" src="${showdetailsModal?.image??"Not available"}" />
    <h3 class="text-[#131313] text-xl font-bold my-2 ">${showdetailsModal?.pet_name??"Not available"}<h3>
    <div class="grid grid-cols-2">
        <div>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon1.svg">Breed: ${showdetailsModal?.breed??"Not available"}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Gender: ${showdetailsModal?.gender??"Not available"}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Vaccinated status: ${showdetailsModal?.vaccinated_status??"Not available"}</p>
        </div>
        <div>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon2.svg">Birth: ${showdetailsModal?.date_of_birth??"Not available"}</p>
            <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (2).svg">Price: ${showdetailsModal?.price??"Not available"}</p>
        </div>
        
        
    </div>    
    <br><hr><br> 
    <h4 class="font-bold my-2 text-base">Details Information</h4>
    <p class="text-[#131313b3]">${showdetailsModal?.pet_details??"Not available"}</p>

    `
    detailsModal.appendChild(div);
    document.getElementById('detailsModal').click();
}


// modal for adopt
function adoptBtnFn(petId) {
    const adopt = document.getElementById('adopt');
    const timer = document.getElementById('timer');
    let count = 3;
    const adoptBtn =
        document.getElementById(`adoptBtn_${petId}`);
    adoptBtn.disabled = true;
    adoptBtn.classList.add('disabled');
    adoptBtn.classList.remove('text-[#0E7A81]');
    adoptBtn.classList.remove('border-[#0e7a8126]');

    adopt.showModal();
    timer.innerText = 3;

    const interval = setInterval(function () {
        count--;
        timer.innerText = count;

        if (count === 0) {
            clearInterval(interval);
            adopt.close();
        }
    }, 1000);
}


// view more button 
document.getElementById('scrollButton').onclick = function () {
    document.getElementById('adoptFriend').scrollIntoView({ behavior: 'smooth' });
};

