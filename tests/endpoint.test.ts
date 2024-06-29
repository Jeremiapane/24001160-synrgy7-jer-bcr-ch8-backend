describe("Testing API endpoints", () => {
    it("should fetch data", async () => {
        const response = await fetch("http://localhost:8686/api/v1/cars");
        const data = await response.json();
        expect(data).toEqual({
            message: "Data cars ditemukan",
            resp: [
                {
                    id: 2,
                    name: "Innova",
                    harga: 1500000,
                    foto: "https://res.cloudinary.com/dcyojno0c/image/upload/v1717311051/Challenge_Binar/2022_Toyota_Kijang_Innova_2.4_G_GUN142R__2820220302_29_ery9sa.jpg",
                    start_rent: "2024-06-01T17:00:00.000Z",
                    finish_rent: "2024-06-01T17:00:00.000Z",
                    created_at: "2024-06-02T08:28:04.611Z",
                    updated_at: "2024-06-02T08:38:18.490Z",
                    created_by: "Jepan",
                    updated_by: "Heri",
                },
                {
                    id: 7,
                    name: "Fortuner",
                    harga: 6500000,
                    foto: "https://res.cloudinary.com/dcyojno0c/image/upload/v1717336661/Challenge_Binar/r7atcy1wjxi8wsgu59du.jpg",
                    start_rent: "2024-06-01T17:00:00.000Z",
                    finish_rent: "2024-06-01T17:00:00.000Z",
                    created_at: "2024-06-02T13:57:41.627Z",
                    updated_at: "2024-06-02T13:57:41.627Z",
                    created_by: "Heri",
                    updated_by: "Heri",
                },
                {
                    id: 9,
                    name: "alphard",
                    harga: 7777777,
                    foto: "https://res.cloudinary.com/dcyojno0c/image/upload/v1718974241/Challenge_5/ysuofta27cb55kr6kppx.jpg",
                    start_rent: "2024-06-20T17:00:00.000Z",
                    finish_rent: "2024-06-20T17:00:00.000Z",
                    created_at: "2024-06-21T12:34:26.360Z",
                    updated_at: "2024-06-21T12:50:40.039Z",
                    created_by: "Jepan",
                    updated_by: "Jepan",
                },
            ],
        });
    });
});
