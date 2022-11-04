--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    price_range integer NOT NULL,
    user_id uuid,
    CONSTRAINT restaurants_price_range_check CHECK (((price_range >= 1) AND (price_range <= 5)))
);


ALTER TABLE public.restaurants OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    body character varying(255),
    rating integer,
    restaurant_id integer NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (id, name, location, price_range, user_id) FROM stdin;
56	de la john	JOHN	2	4ef7a0e9-9451-4787-8ad2-fac1500c4e5e
58	Carl eto pizdets	Car	4	dffd15f2-6a67-4b18-a98e-cd0019697d24
57	de la john milimetron	JOHN	2	4ef7a0e9-9451-4787-8ad2-fac1500c4e5e
27	LaTudor	Balatina	2	\N
6	Hachapuri	SF	2	\N
25	Andys	Chisinau	3	\N
20	PizzaHut	LA	3	\N
50	LaGheorghii	Kavkaz	2	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, name, body, rating, restaurant_id) FROM stdin;
2	carl	awesome again	2	25
4	john	carl was right	3	25
5	vikion	just beer after lamb	2	27
15	Crock	Crock	2	25
16	Dave	I don't like the form of the pizza. It must be round!!!	2	20
17	Harry	cheap beer	5	25
18	Gomy	not mamasita	2	25
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email) FROM stdin;
dffd15f2-6a67-4b18-a98e-cd0019697d24	carl	$2a$10$OyzG0ZoRTRyyvl.s3zmAO.xBAOafd73uJ4Xxxb8Fgux2oXJgTdX1C	carl@gmail.com
4ef7a0e9-9451-4787-8ad2-fac1500c4e5e	john	$2a$10$fpeTgrNcY3ANbVWm0/wkcOqVJTU8DPWnTv4oPGU6qyWFldPTEnb46	john@gmail.com
6285679d-7b95-4ac6-88e7-e572015bdf73	jerry	$2a$10$SuSEEqfo9yaaRJDipjaulegsnEPWjwPKSbHZy41kWgfTCvTZQcjIC	jerry@gmail.com
42f83fa4-d9f6-4418-8f26-3dc6cccf986d	jerry	$2a$10$7wo7vrMiYvFYF6CKkV20NO0WdbALWrVhn3W/qNbxiNr1J84b0/1b2	jerry@gmail.com
a9073cb6-5b30-4b2a-9ac2-2567d63fbd75	ion	$2a$10$zZ20u1pXhGWuFgLeIMg6GuCxDTMCvB29bPZ5pxLMBiJis1bcc7oYa	ion@gmail.com
\.


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 58, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 18, true);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: reviews reviews_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- Name: restaurants user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

