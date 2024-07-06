import axios from "axios";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import logoCurcol from "../../public/assets/curcol/logoCurcol.png";

interface IFormParagonProps {}

const FormParagon: React.FunctionComponent<IFormParagonProps> = (props) => {
  const [kata, setKata] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [error, setError] = useState("");

  const containsProhibitedWords = (input: string) => {
    const prohibitedWords = [
      "Anjing",
      "Babi",
      "Monyet",
      "Kunyuk",
      "Bajingan",
      "Asu",
      "Bangsat",
      "Kampret",
      "Perek",
      "Pecun",
      "Bencong",
      "Banci",
      "Jablay",
      "Maho",
      "Bego",
      "Bodoh",
      "Idiot",
      "Geblek",
      "Goblok",
      "Sinting",
      "Orang Gila",
      "Gila",
      "Sinting",
      "Tolol",
      "Sarap",
      "Udik",
      "Kampungan",
      "Budek",
      "Bolot",
      "Jelek",
      "Setan",
      "Iblis",
      "Jahannam",
      "Dajjal",
      "Jin Tomang",
      "Keparat",
      "Ngewe",
      "Ngentot",
      "Bejad",
      "Gembel",
      "Brengsek",
      "Tai",
    ];

    return prohibitedWords.some((word) => {
      const regex = new RegExp(
        word
          .split("")
          .map((char) => `${char}+`)
          .join("\\W*"),
        "i"
      );
      return regex.test(input);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (containsProhibitedWords(kata)) {
      setError("Gaboleh kata kasar yah...");
      return;
    }

    try {
      const postData = {
        kata,
      };

      const postResponse = await axios.post(
        "https://konseruntuk.online/api/data1",
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (postResponse.status === 201) {
        setBerhasil(true);
        setKata("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clear the timeout if the component unmounts or error changes
    }
  }, [error]);

  return (
    <>
      <div className="containerFormParagon">
        <div className="containerInputFormParagon">
          <Image className="imageNovo" src={logoCurcol} alt="logoNovo"></Image>
          <form className="formParagon" onSubmit={handleSubmit}>
            {/* <h1>Whats is the best version of you?</h1> */}

            <div className="inputWrapper">
              <input
                type="text"
                required
                value={kata}
                placeholder="Silahkan curcol..."
                onChange={(e) => setKata(e.target.value)}
                maxLength={40}
              />
              {error ? <p>{error}</p> : null}
              {berhasil ? <p>Terima kasih!</p> : null}
              <button className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormParagon;
