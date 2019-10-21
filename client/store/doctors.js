const doctorList = [];

for (let i = 0; i < 25; i++) {
    doctorList.push({
        id: i,
        name: "Иван",
        surname: `Иванов 0${i + 1}`,
        middlename: `Александрович`,
        specialty: "Терапевт",
        phone: `+7 ${i}${i}${i} ${i}${i}${i} ${i}${i} ${i}${i}`,
        email: `ivan.ivanov${i}@mail.com`
    });
}

export const state = () => ({
    list: doctorList
})
