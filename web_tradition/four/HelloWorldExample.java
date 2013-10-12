/**
 * Created with IntelliJ IDEA.
 * User: caoyangkaka
 * Date: 4/8/13
 * Time: 1:44 AM
 * To change this template use File | Settings | File Templates.
 */

import java.io.*;
import java.net.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * The simplest possible servlet.
 *
 * @author James Duncan Davidson
 *
 * In order to avoid the situation of changing some wired xml file, so here
 * I just change the file of HelloWorldExample to fit the music searching Homework8.
 * Duty of this servlet:
 * 1. Initiating a connection with the Perl or PHP script, using the Apache server from
 * Homework #6, to retrieve the appropriate listings by scraping allmusic.com.
 */

public class HelloWorldExample extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws IOException, ServletException
    {
        request.setCharacterEncoding("UTF-8");
        String title = request.getParameter("title");
        String type =  request.getParameter("type");
        title = URLEncoder.encode(title, "UTF-8");
        title = title.replace(' ','+');
        String json;
        PrintWriter out = response.getWriter();
        response.setContentType("text/json;charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        String xmlData = getPhpData(title, type, "UTF-8");
        if(type.equals("artists")) {
            json = parseArtists(xmlData);
        } else if(type.equals("albums")) {
            json = parseAlbums(xmlData);
        } else {
            json = parseSongs(xmlData);
        }
        out.println(json);
        //out.println(xmlData);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
            throws IOException, ServletException
    {
        doGet(request, response);
    }


    private String getPhpData(String title, String type, String charset) {
        String phpData = "";
        String url = "http://mattcao.elasticbeanstalk.com/?title="+title+"&type="+type;
        try {
            URL XmlUrl = new URL(url);
            URLConnection phpConnection = XmlUrl.openConnection();
            phpConnection.setAllowUserInteraction(false);
            phpConnection.setRequestProperty("Accept-Charset", "UTF-8");
            InputStream in = phpConnection.getInputStream();
            InputStreamReader xmlContent = new InputStreamReader(in,charset);
            BufferedReader reader = new BufferedReader(xmlContent);
            String lineContent;
            while ((lineContent = reader.readLine()) != null) {
                phpData += lineContent;

            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            phpData = URLDecoder.decode(phpData, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return phpData;
    }

    private String parseArtists(String xmlData) {
        SAXBuilder builder = new SAXBuilder();
        Document doc = null;
        String[] cover = new String[5];
        String[] name = new String[5];
        String[] genre = new String[5];
        String[] year = new String[5];
        String[] details = new String[5];
        String json = "";
        Reader in= new StringReader(xmlData);
        int length = 0;
        try {
            doc = builder.build(in);
            Element root = doc.getRootElement();
            List ls = root.getChildren();
            for (Iterator iter = ls.iterator(); iter.hasNext(); ) {
                Element el = (Element) iter.next();
                if(el.getName().equals("result")){
                    cover[length] = el.getAttributeValue("cover");
                    name[length] = el.getAttributeValue("name");
                    genre[length] = el.getAttributeValue("genre");
                    year[length] = el.getAttributeValue("year");
                    details[length] = el.getAttributeValue("details");
                    length++;
                }
            }
            /*
            String s = "";
            for(int i = 0; i < length; i++) {
	            s += "cover:" + cover[i] + ", name:" + name[i] + ", genre:" + genre[i] + ", year:" + year[i] + ", details:"
	            + details[i] + "\n";
            }
            return s;
            */
            JSONObject jsonObj = new JSONObject();
            JSONArray jsonArr = new JSONArray();
            JSONObject rootObj = new JSONObject();
            try {
                for(int i = 0; i < length; i++) {
                    JSONObject jsonObjArr = new JSONObject();
                    jsonObjArr.put("cover", cover[i]);
                    jsonObjArr.put("name", name[i]);
                    jsonObjArr.put("genre", genre[i]);
                    jsonObjArr.put("year", year[i]);
                    jsonObjArr.put("details", details[i]);
                    jsonArr.put(jsonObjArr);
                }
                jsonObj.put("result", jsonArr);
                rootObj.put("results", jsonObj);
                json = rootObj.toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
        catch (JDOMException ex) {
            ex.printStackTrace();
        }
        return json;
    }

    private String parseAlbums(String xmlData) {
        SAXBuilder builder = new SAXBuilder();
        Document doc = null;
        String[] cover = new String[5];
        String[] title = new String[5];
        String[] genre = new String[5];
        String[] year = new String[5];
        String[] artist = new String[5];
        String[] details = new String[5];
        String json = "";
        Reader in= new StringReader(xmlData);
        int length = 0;
        try {
            doc = builder.build(in);
            Element root = doc.getRootElement();
            List ls = root.getChildren();
            for (Iterator iter = ls.iterator(); iter.hasNext(); ) {
                Element el = (Element) iter.next();
                if(el.getName().equals("result")){
                    cover[length] = el.getAttributeValue("cover");
                    title[length] = el.getAttributeValue("title");
                    genre[length] = el.getAttributeValue("genre");
                    year[length] = el.getAttributeValue("year");
                    artist[length] = el.getAttributeValue("artist");
                    details[length] = el.getAttributeValue("details");
                    length++;
                }
            }
            JSONObject jsonObj = new JSONObject();
            JSONArray jsonArr = new JSONArray();
            JSONObject rootObj = new JSONObject();
            try {
                for(int i = 0; i < length; i++) {
                    JSONObject jsonObjArr = new JSONObject();
                    jsonObjArr.put("cover", cover[i]);
                    jsonObjArr.put("title", title[i]);
                    jsonObjArr.put("genre", genre[i]);
                    jsonObjArr.put("year", year[i]);
                    jsonObjArr.put("artist", artist[i]);
                    jsonObjArr.put("details", details[i]);
                    jsonArr.put(jsonObjArr);
                }
                jsonObj.put("result", jsonArr);
                rootObj.put("results", jsonObj);
                json = rootObj.toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
        catch (JDOMException ex) {
            ex.printStackTrace();
        }
        return json;
    }

    private String parseSongs(String xmlData) {
        SAXBuilder builder = new SAXBuilder();
        Document doc = null;
        String[] sample = new String[5];
        String[] title = new String[5];
        String[] performer = new String[5];
        String[] composer = new String[5];
        String[] image = new String[5];
        String[] details = new String[5];
        String json = "";
        Reader in= new StringReader(xmlData);
        int length = 0;
        try {
            doc = builder.build(in);
            Element root = doc.getRootElement();
            List ls = root.getChildren();
            for (Iterator iter = ls.iterator(); iter.hasNext(); ) {
                Element el = (Element) iter.next();
                if(el.getName().equals("result")){
                    sample[length] = el.getAttributeValue("sample");
                    title[length] = el.getAttributeValue("title");
                    performer[length] = el.getAttributeValue("performer");
                    composer[length] = el.getAttributeValue("composer");
                    image[length] = el.getAttributeValue("image");
                    details[length] = el.getAttributeValue("details");
                    length++;
                }
            }
            JSONObject jsonObj = new JSONObject();
            JSONArray jsonArr = new JSONArray();
            JSONObject rootObj = new JSONObject();
            try {
                for(int i = 0; i < length; i++) {
                    JSONObject jsonObjArr = new JSONObject();
                    jsonObjArr.put("sample", sample[i]);
                    jsonObjArr.put("title", title[i]);
                    jsonObjArr.put("performer", performer[i]);
                    jsonObjArr.put("composer", composer[i]);
                    jsonObjArr.put("image", image[i]);
                    jsonObjArr.put("details", details[i]);
                    jsonArr.put(jsonObjArr);
                }
                jsonObj.put("result", jsonArr);
                rootObj.put("results", jsonObj);
                json = rootObj.toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
        catch (JDOMException ex) {
            ex.printStackTrace();
        }
        return json;
    }
}




