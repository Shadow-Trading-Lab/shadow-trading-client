export type TeamShadow = {
  "version": "0.1.0",
  "name": "team_shadow",
  "instructions": [
    {
      "name": "greet",
      "accounts": [],
      "args": []
    },
    {
      "name": "hello",
      "accounts": [],
      "args": []
    },
    {
      "name": "createSystemAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ]
};

export const IDL: TeamShadow = {
  "version": "0.1.0",
  "name": "team_shadow",
  "instructions": [
    {
      "name": "greet",
      "accounts": [],
      "args": []
    },
    {
      "name": "hello",
      "accounts": [],
      "args": []
    },
    {
      "name": "createSystemAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ]
};
