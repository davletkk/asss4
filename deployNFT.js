async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying NFT contract with the account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  console.log("MyNFT address:", myNFT.address);

  // Mint a new NFT
  const recipient = deployer.address;
  const tokenURI = "ipfs://<your-ipfs-hash>"; // Replace with your IPFS hash
  const tokenId = await myNFT.mintNFT(recipient, tokenURI);

  console.log("NFT minted with token ID:", tokenId.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
