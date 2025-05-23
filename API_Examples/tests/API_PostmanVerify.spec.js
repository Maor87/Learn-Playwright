import { test, expect } from '@playwright/test';
import users from '../Test_Data/UsersResponse.json';

test.describe('API Postman Verification', () => {
  // test to verify users endpoint is returning expected users
  test('Verify mulitple records returned against stored static response', async ({ request }) => {
    // save raw reponse to variable
    const response = await request.get('https://reqres.in/api/users/2');

    //parse the response body into a JS object with access to the actual data within the response body 
    const responseBody = await response.json();

    // Assert users info
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
    expect(responseBody.data.first_name).toBe("Janet");
    expect(responseBody.data.last_name).toBe("Weaver");
    expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");
    // response body should contain the expected data
    expect(responseBody).toEqual(users);
  });

   //test for POST request
   test('Verify POST request', async ({ request }) => {
    const newUser = {
      name: "Maor",
      job: "QA Engineer"
    }

    // create request and save response
    const response = await request.post('https://reqres.in/api/users', {
      data: newUser
    });

    const responseBody = await response.json();
    console.log(responseBody);
    // Verify response
    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe("Maor");
    expect(responseBody.job).toBe("QA Engineer");
   });

   // Verify PUT request
   test('Verify PUT request', async ({ request }) => {
    const updatedUser = {
      name: "Maor Shaer",//Update name
      job: "QA Engineer"
    }

    // Do put request and save response
    const response = await request.put('https://reqres.in/api/users/2', {
      data: updatedUser
    });

    const responseBody = await response.json();
    //console.log(responseBody);
    // Verify response
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe(updatedUser.name);
    expect(responseBody.job).toBe("QA Engineer");
  })

  // Verify DELETE request
  test('Verify DELETE request user is deleted', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    console.log(response)
    // Verify response
    expect(response.status()).toBe(204);
  })

});