interface Car {
    id: number;
    name: string;
    harga: number;
    foto: string;
    start_rent: string;
    finish_rent: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

describe("Testing API endpoints", () => {
    const expectedDataStructure: {
        message: string;
        resp: Car[];
    } = {
        message: expect.any(String),
        resp: expect.arrayContaining([expect.any(Object) as Car]), // Use Car type
    };

    it("should fetch data", async () => {
        const response = await fetch("http://localhost:8686/api/v1/cars");
        const data = await response.json();

        expect(data).toEqual(expect.objectContaining(expectedDataStructure));
    });
});
