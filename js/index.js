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
            <div  class="btn btn-outline flex h-[100px] border-inherit">
                <img class="h-1/2" src="${value.category_icon}" />
                <h3 class="text-[#131313] text-2xl font-semibold">${value.category}<h3>
            </div>
        `
        categories.appendChild(btn)

    }
}

category();

function pets() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(values => showPets(values.pets))
        .catch(error => console.log(error))
}

function showPets(values) {
    const pets = document.getElementById('pets');
    for (const value of values) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="border flex flex-col border-inherit p-4 rounded-xl space-y-2">
                <img class="object-fill w-full rounded-xl mb-4" src="${value.image}" />
                <h3 class="text-[#131313] text-xl font-bold">${value.pet_name}<h3>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon1.svg">Breed: ${value.pet_name}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/peticon2.svg">Birth: ${value.date_of_birth}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (1).svg">Gender: ${value.gender}</p>
                <p class="text-[#131313b3] font-normal text-base flex gap-2"><img src="images/Frame (2).svg">Price: ${value.price}</p><br><hr><br>
                
                <div class="flex gap-2 lg:gap-1 justify-between">
                    <button class="btn btn-outline border border-[#0e7a8126] py-2 rounded-xl"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn btn-outline border border-[#0e7a8126] py-2 rounded-xl text-lg font-semibold text-[#0E7A81]">Adopt</button>
                    <button class=" btn btn-outline border border-[#0e7a8126] py-2 rounded-xl text-lg font-semibold text-[#0E7A81]">Details</button>
                </div>

            </div>
        `
        pets.appendChild(div)

    }
}

pets();