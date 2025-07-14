### Tolygotchi Technical Specification for AI Assistants

#### 1. Project Overview & Core Pillars
*   **Project Name:** Tolygotchi
*   **Concept:** A Tamagotchi-style virtual pet game for Android, built on the Solana Mobile Stack.
*   **Core Loop:** The "Care & Collect" model. Players hatch unique pets ("Tolygotchis") from their existing Solana NFTs and are responsible for their daily care.
*   **Pillars:**
    1.  **Solana-Native:** Mechanics must meaningfully integrate the Solana blockchain (NFTs, SPL Tokens, on-chain time).
    2.  **Engaging & Cute:** The core experience is fostering an emotional connection with a cute, expressive pet through simple, satisfying care interactions.
    3.  **Unique Hook:** The *Monster Rancher*-inspired NFT-to-pet generation is the primary innovation and must be highlighted.
    4.  **Hackathon Feasibility:** The scope is tightly focused on a polished MVP achievable in a few days.

#### 2. Technology Stack & Tooling
*   **Framework:** **React Native with Expo**. This choice is critical due to superior AI tooling support for JavaScript/TypeScript, the simplicity of Expo for setup and builds, and official Solana Mobile support.
*   **Language:** **TypeScript**.
*   **Solana Libraries:**
    *   `@solana/web3.js`: For all fundamental RPC interactions and transaction building.
    *   `@solana/wallet-adapter`: For connecting to the user's wallet.
    *   `@metaplex-foundation/umi`: The modern library for fetching and parsing NFT metadata.
*   **On-Chain Program (Smart Contract):**
    *   **Framework:** **Anchor**.
    *   **Development:** Use **Solana Playground** for rapid prototyping and deployment of the SPL token contract to avoid a local Rust setup.
*   **Art & Assets:**
    *   **Generation:** **AI Image Generators** (e.g., Stable Diffusion) for all character art, UI elements, and backgrounds.
    *   **Editing:** **Image Editor** (e.g., Figma, Photoshop) for separating AI art into layers for animation.
*   **UI/UX Design:**
    *   **Prototyping:** **Figma** for creating initial wireframes and screen layouts before coding begins.

#### 3. Core Gameplay Mechanics & Logic

##### 3.1. Pet Stats & State
*   **Core Stats:** The pet's state is defined by three primary variables:
    *   `hunger`: An integer that increases over time. Reduced by the "Feed" action.
    *   `happiness`: An integer that decays over time. Increased by the "Pet" action.
    *   `health` (or `cleanliness`): An integer that decreases when other needs are neglected (e.g., not cleaning up poop). Increased by the "Clean" action.
*   **Time Simulation:** A `clock_tick` function runs at a regular interval (e.g., `setInterval` in React Native) to decay the stats, simulating the passage of time. When the app is reopened, calculate the offline time and apply the appropriate number of ticks.

##### 3.2. NFT-to-Pet Generation (The "Hatching" Mechanic)
This is the central feature and must be deterministic (the same NFT always creates the same pet).
1.  **Wallet Connection:** Use the Solana Wallet Adapter to connect to the user's wallet.
2.  **Fetch NFTs:** Use an API service (like Shyft) or the Metaplex Umi library to fetch a list of all NFTs in the user's wallet.
3.  **Display & Select:** Show the NFTs in a simple UI gallery for the user to select one.
4.  **Get Metadata:** For the selected NFT, fetch its full off-chain JSON metadata from the `uri` field.
5.  **Procedural Generation Algorithm (Hash-Based):**
    *   Create a single, canonical string by concatenating the `trait_type` and `value` of all attributes from the NFT's JSON metadata. Sort attributes alphabetically first to ensure determinism.
    *   Use a standard hash function (e.g., SHA-256) on this string to generate a unique, deterministic hash.
    *   Map segments of the hash to pet traits. Use the modulo operator to select from available options.
        *   `colorIndex = parseInt(hash.substring(0, 2), 16) % numColors;`
        *   `eyeShapeIndex = parseInt(hash.substring(2, 4), 16) % numEyeShapes;`
        *   `initialStatBonus = parseInt(hash.substring(4, 6), 16) % 10;`

##### 3.3. Solana-Native Mechanics
*   **On-Chain Time:** For critical cooldowns (like feeding), use Solana's `Clock` sysvar, not the device's clock. Fetch the `unix_timestamp` from a recent block to prevent user manipulation.
*   **Consumable SPL Token (`$TOLYFOOD`):**
    *   Create a standard SPL fungible token using Anchor in Solana Playground.
    *   **Faucet:** The app will have a button that signs a transaction to mint a small amount of `$TOLYFOOD` to the user's wallet.
    *   **Consumption:** The "Feed" action requires signing a transaction that **burns** one `$TOLYFOOD` token.

#### 4. Art & Animation
*   **Style:** Cute, 3D cartoon, Pixar-inspired aesthetic. Use a detailed "master prompt" for AI generation to maintain visual consistency.
*   **Animation Technique:** **Layered Sprites**. The Tolygotchi is not a single animated sprite. It is composed of multiple, separate static images (e.g., `body.png`, `eyes_happy.png`, `eyes_sad.png`, `mouth_open.png`) layered on top of each other. Animation is achieved by swapping these image files based on the pet's state (e.g., if `happiness < 20`, show `eyes_sad.png`). This is simple to implement and highly effective.

#### 5. Data Architecture (On-Chain vs. Off-Chain)
*   **On-Chain (Source of Truth):**
    *   Pet's unique identity and proof of ownership (the NFT itself).
    *   Permanent, foundational traits (stored in the NFT's metadata URI).
    *   Balances of SPL Tokens (e.g., `$TOLYFOOD`).
*   **Off-Chain (Local Device Storage):**
    *   Dynamic, frequently changing stats (`hunger`, `happiness`, `health`).
    *   Interaction history and cooldown timestamps.
    *   Current animation state (e.g., `isEating`).