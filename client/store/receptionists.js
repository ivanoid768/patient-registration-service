const list = [];

for (let i = 0; i < 35; i++) {
    list.push({
        id: i,
        name: "Мария",
        surname: `Иванова 0${i + 1}`,
        middlename: `Николаевна`,
        phone: `+7 ${i}${i}${i} ${i}${i}${i} ${i}${i} ${i}${i}`,
        email: `masha.ivanova${i}@mail.com`
    });
}

export const state = () => ({
    list: list
})
